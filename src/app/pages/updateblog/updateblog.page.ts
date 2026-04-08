import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Blog } from 'src/app/services/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-updateblog',
  templateUrl: './updateblog.page.html',
  styleUrls: ['./updateblog.page.scss'],
})
export class UpdateblogPage implements OnInit {
  blog : Blog;
  blogById: Blog;
  blogId : string;
  bImage : string;
  editBlogForm: FormGroup;
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

  constructor(private route: ActivatedRoute ,private sanitizer: DomSanitizer,
    private router: Router,
    private blogService: BlogService) { 
      this.blogId = this.route.snapshot.params.blogId;

      this.blog = new Blog('', '', '','', '');
      this.editBlogForm = new FormGroup({
      bTitle : new FormControl(this.blog.bTitle),
      bStory : new FormControl(this.blog.bStory),
      readTime : new FormControl(this.blog.readTime),
      });
    this.blogService.getBlogById(this.blogId)
      .subscribe(data => {
        this.blog = data;

        if (this.blog) {
          this.bImage = this.blog.bImage;
          this.editBlogForm.controls.bTitle.setValue(this.blog.bTitle);
          this.editBlogForm.controls.bStory.setValue(this.blog.bStory);
          this.editBlogForm.controls.readTime.setValue(this.blog.readTime);
          //this.editCampaignForm.controls.update.setValue(this.project.update);
        }
      });
    }

  ngOnInit() {
  }
  update() {
    // console.log(this.project.prjId);
    const prod = new Blog(
      this.blog.blogId,
      this.editBlogForm.value.bTitle,
      this.editBlogForm.value.bStory,
      this.editBlogForm.value.readTime,
      this.photo,
      );
      console.log(prod);
    this.blogService.update(prod);
    this.router.navigate(['personal-blog']);
    }

}
