import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/services/shankari_services/project_service/project.service';
import { Update } from 'src/app/services/services/shankari_services/update';
@Component({
  selector: 'app-create-updates',
  templateUrl: './create-updates.page.html',
  styleUrls: ['./create-updates.page.scss'],
})
export class CreateUpdatesPage implements OnInit {
  updateForm: FormGroup;
  prjID: string;
  submitted: boolean = false;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private router: Router) {
    this.prjID = this.route.snapshot.params.id;

    this.updateForm = new FormGroup({
      updateTitle: new FormControl('', [Validators.required]),
      updateDetails: new FormControl('',[Validators.required])
    })
   }

  ngOnInit() {
  }

  postUpdate() {
    this.submitted = true;

    if (this.updateForm.valid) {
      const updates = new Update(
        this.updateForm.value.updateTitle,
        this.updateForm.value.updateDetails,
        this.prjID
      )
      console.log(updates)
      this.projectService.createUpdates(updates);
      this.router.navigate(['/updates-list/'+this.prjID])
    }
  }
}
