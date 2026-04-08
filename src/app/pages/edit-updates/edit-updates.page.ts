import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/services/shankari_services/project_service/project.service';
import { Update } from 'src/app/services/services/shankari_services/update';
@Component({
  selector: 'app-edit-updates',
  templateUrl: './edit-updates.page.html',
  styleUrls: ['./edit-updates.page.scss'],
})
export class EditUpdatesPage implements OnInit {
  update: Update;
  editUpdateForm: FormGroup;
  updID: string;
  prjID: string;
  submitted: boolean = false;

  
  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) { 
    this.updID = this.route.snapshot.params.id;
    this.prjID = this.route.snapshot.params.prjId;
    this.update = new Update("","","");

    this.editUpdateForm = new FormGroup({
      updTitle: new FormControl(this.update.updatetitle, [Validators.required]),
      updDetails: new FormControl(this.update.updateDetail, [Validators.required])
    })

    this.projectService.getUpdateById(this.updID,this.prjID)
      .subscribe(data => {
        this.update = data
        console.log(data)
        if(this.update){
          this.editUpdateForm.controls.updTitle.setValue(this.update.updatetitle);
          this.editUpdateForm.controls.updDetails.setValue(this.update.updateDetail);

        }
      })
  }

  ngOnInit() {
  }

  editUpdate(){
    this.submitted =true;
    
    if(this.editUpdateForm.valid){
      const upd = new Update(
        this.editUpdateForm.value.updTitle,
        this.editUpdateForm.value.updDetails,
        this.update.prjId,
        this.update.updateID
      )
      this.projectService.editUpdate(upd)
      this.router.navigate(['/updates-list/'+this.prjID])
    }
  }
}
