import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/services/models/projects';
import { ProjectService } from 'src/app/services/services/shankari_services/project_service/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.scss'],
})
export class ProjectDetailsPage implements OnInit {
  project: Project;
  prjID: string;
  img: string;
  totalAmt: number;
  truncAmt: number;
  constructor(private projectService: ProjectService, private route: ActivatedRoute) {
    this.prjID = this.route.snapshot.params.id
    this.project = new Project("", "", "", "", "", 0, new Date, new Date, "", "", "", "", "")

    this.projectService.getPrjById(this.prjID)
      .subscribe(data => {
        this.project = data;
        this.img = data.image
      });

    this.projectService.getTxnedAmt(this.prjID)
      .subscribe(data => {
        this.totalAmt = data;
        this.truncAmt = parseFloat(this.totalAmt.toFixed(2))
        console.log(this.truncAmt)
      });
  }

  



  ngOnInit() {
  }

}
