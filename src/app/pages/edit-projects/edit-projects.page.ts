import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProjectService } from 'src/app/services/services/shankari_services/project_service/project.service';
import { Project } from 'src/app/services/services/shankari_services/project';


@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.page.html',
  styleUrls: ['./edit-projects.page.scss'],
})
export class EditProjectsPage implements OnInit {
  prjID: string;
  project: Project
  editProjectsForm: FormGroup
  categoryList: string[];
  fundingTypeList: string[];
  projectImg: string;
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

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) {
    this.prjID = this.route.snapshot.params.id;
    this.categoryList = ['Start-up', 'Education', 'Prototype'];   //need to check?
    this.fundingTypeList = ['Flexible', 'Fixed'];

    this.project = new Project("", "", "", "", "", 0, new Date(), new Date(), "", "", "", "", "", 0);

    this.editProjectsForm = new FormGroup({
      prjName: new FormControl(this.project.title, [Validators.required]),
      category: new FormControl(this.project.category),
      story: new FormControl(this.project.story, [Validators.required]),
      risk: new FormControl(this.project.risk, [Validators.required])
      // prjName: new FormControl(this.project.title, [Validators.required]),
      // category: new FormControl(''),
      // story: new FormControl('',[Validators.required]),
      // risk: new FormControl('',[Validators.required])
    })

    this.projectService.getPrjById(this.prjID)
      .subscribe(data => {
        this.project = data;
        if (this.project) {
          // console.log(this.project.startDate.toDateString())
          this.photo = this.project.image;
          this.editProjectsForm.controls.prjName.setValue(this.project.title);
          this.editProjectsForm.controls.category.setValue(this.project.category);
          this.editProjectsForm.controls.story.setValue(this.project.story);
          this.editProjectsForm.controls.risk.setValue(this.project.risk);
        }
      });
  }

  ngOnInit() {
  }

  update() {
    this.submitted = true;

    if (this.editProjectsForm.valid) {
      const prj = new Project(
        this.project.prjId,
        this.editProjectsForm.value.prjName,
        this.editProjectsForm.value.story,
        this.editProjectsForm.value.risk,
        this.editProjectsForm.value.category,
        this.project.target,
        this.project.startDate,
        this.project.endDate,
        this.project.prjType,
        this.project.fundingType,
        this.project.userId,
        this.project.status,
        this.photo,
        this.project.aiScore
      )
      //service
      this.projectService.updateProject(prj)

    }
    this.router.navigate['/project-listing']
  }


}
