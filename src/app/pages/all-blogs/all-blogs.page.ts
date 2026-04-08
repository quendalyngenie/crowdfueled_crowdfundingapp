import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/services/blog';
import { BlogService } from 'src/app/services/blog.service';



@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.page.html',
  styleUrls: ['./all-blogs.page.scss'],
})
export class AllBlogsPage implements OnInit {
  blog: Blog[];

  constructor(private blogService: BlogService) {
    this.blogService.getBlogs()
      .subscribe(data => {
        this.blog = data;
      });
   }

  ngOnInit() {
  }

}
