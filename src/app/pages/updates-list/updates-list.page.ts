import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/services/shankari_services/project_service/project.service';
import { Update } from 'src/app/services/services/shankari_services/update';

@Component({
  selector: 'app-updates-list',
  templateUrl: './updates-list.page.html',
  styleUrls: ['./updates-list.page.scss'],
})
export class UpdatesListPage implements OnInit {
  update: Update[]
  prjId: string

  constructor(private projectService:ProjectService, private route: ActivatedRoute) { 
    this.prjId = this.route.snapshot.params.id

    this.projectService.getUpdates(this.prjId)
      .subscribe(data => {
        this.update = data
        console.log(data)
      })
  }

  ngOnInit() {
  }

 

}
