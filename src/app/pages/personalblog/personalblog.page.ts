import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Blog } from 'src/app/services/blog';
import { BlogService } from 'src/app/services/blog.service';



@Component({
  selector: 'app-personalblog',
  templateUrl: './personalblog.page.html',
  styleUrls: ['./personalblog.page.scss'],
})
export class PersonalblogPage implements OnInit {
  blog: Blog[] = []
  userId: string

  constructor(private blogService: BlogService, private authService: AuthService) {
    this.userId = this.authService.getId()
    this.blogService.getBlogByUser(this.userId)
      .subscribe(data => {
        this.blog = data;
        console.log(data);
      })
  }

  delete(item: Blog) {
    this.blogService.delete(item);
  }

  ngOnInit() {
  }

}