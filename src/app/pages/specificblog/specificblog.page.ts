import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/services/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-specificblog',
  templateUrl: './specificblog.page.html',
  styleUrls: ['./specificblog.page.scss'],
})
export class SpecificblogPage implements OnInit {
  blog: Blog;
  blogById: Blog;
  blogId: string;
  bImage: string;
  photo: SafeResourceUrl;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService) {
    this.blog = new Blog('', '', '', '', '')
    this.blogId = this.route.snapshot.params.blogId;
    this.blogService.getBlogById(this.blogId)
      .subscribe(data => {
        this.blog = data;
      }
      );
  }

  ngOnInit() {
  }

}
