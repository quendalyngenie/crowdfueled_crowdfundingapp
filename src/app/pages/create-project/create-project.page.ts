import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { user } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Project } from 'src/app/services/services/shankari_services/project';
import { ProjectService } from 'src/app/services/services/shankari_services/project_service/project.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as Sentiment from 'sentiment';
import { LoadingService } from 'src/app/services/services/shankari_services/loading/loading.service';

declare var createCampaign

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
})
export class CreateProjectPage implements OnInit {
  @ViewChild('inputText', { static: false }) inputText: any;
  @Output() sentimentEmitter = new EventEmitter();
  sentimentResult: any;
  scores: [];

  addProject: FormGroup;
  categoryList: string[];
  fundingTypeList: string[];
  userData: string;
  submitted: boolean = false;
  photo: SafeResourceUrl;

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  static dateValidation(fc: FormControl) {
    const date = new Date();
    let day = date.getDate()
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) day = 0 + day;
    if (month < 10) month = 0 + month;

    let currentDate = year + '-' + month + '-' + day;
    // console.log(currentDate, fc.value)

    if (fc.value > currentDate) {
      return ({ dateValidation: true })
    }
    else {
      return (null)
    }
  }
  static LessThanToday(fc: FormControl) {
    let today: Date = new Date();

    if (new Date(fc.value) < today) {
      return ({ LessThanToday: true });
    } else {
      return (null);
    }
  }

  constructor(private projectService: ProjectService, private authService: AuthService,
    private router: Router, private sanitizer: DomSanitizer,
    private ionLoaderService: LoadingService) {
    this.categoryList = ['Art', 'Crafts', 'Design', 'Fashion', 'Film & Video',
      'Journalism', 'Technology', 'Culture', 'Environment', 'Education', 'Local Business'];   //need to check?
    this.fundingTypeList = ['Flexible', 'Fixed'];

    this.addProject = new FormGroup({
      prjName: new FormControl('', [Validators.required]),
      category: new FormControl('Start-up'),
      story: new FormControl('', [Validators.required]),
      risk: new FormControl('', [Validators.required]),
      target: new FormControl('', [Validators.required]),
      fundingType: new FormControl('Flexible'),
      startDate: new FormControl('', [CreateProjectPage.LessThanToday]),
      endDate: new FormControl('', [CreateProjectPage.dateValidation])
    })
  }

  ngOnInit() {
  }

  create() {
    this.submitted = true;

    if (this.addProject.valid) {
      var userId = this.authService.getId()
      this.authService.getUserbyType(userId).subscribe(data => {
        // console.log(data)
        // this.userData = data
        const prj = new Project(
          this.projectService.prjrefId,
          this.addProject.value.prjName,
          this.addProject.value.story,
          this.addProject.value.risk,
          this.addProject.value.category,
          this.addProject.value.target,
          this.addProject.value.startDate,
          this.addProject.value.endDate,
          data,
          this.addProject.value.fundingType,
          userId,
          undefined,
          this.photo,
          undefined
        )
        // console.log(prj)
        this.ionLoaderService.simpleLoader()

        let sentiment = new Sentiment();
        let result = sentiment.analyze(this.addProject.value.prjName);
        this.sentimentEmitter.emit(result);
        prj.aiScore = result.score;
        // console.log(result.score);

        if (result.score >= 0) {
          prj.status = "approved"
          var bcCampign = createCampaign(prj)
          bcCampign.then(r => {
            this.projectService.createPrj(prj);
            this.ionLoaderService.dismissLoader();

            var path = '/create-rewards/' + this.projectService.prjrefId
            this.router.navigate([path])

          }).catch(error => {
            prj.status = "error"
            this.projectService.createPrj(prj);
            this.ionLoaderService.dismissLoader();
            alert("Error is Metamask transaction"); //toast 

            this.router.navigate(['/project-listing'])
          })
        }
        else {
          prj.status = "flagged"
          this.projectService.createPrj(prj);
          alert("Your ideas has been flagged");
          this.router.navigate(['/project-listing']);
        }


      })
    }


    // console.log(this.userData)
    // const prj = new Project(
    //   this.projectService.prjrefId,
    //   this.addProject.value.prjName,
    //   this.addProject.value.story,
    //   this.addProject.value.risk,
    //   this.addProject.value.category,
    //   this.addProject.value.target,
    //   this.addProject.value.startDate,
    //   this.addProject.value.endDate,
    //   this.userData,
    //   this.addProject.value.fundingType,
    //   userId,
    //   'pending',
    //   undefined
    // )
    // console.log(prj)
    // this.projectService.createPrj(prj);
  }

}
