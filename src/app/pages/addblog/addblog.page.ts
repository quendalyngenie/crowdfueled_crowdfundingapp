import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from 'src/app/services/blog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.page.html',
  styleUrls: ['./addblog.page.scss'],
})
export class AddblogPage implements OnInit {
  addBlogForm: FormGroup;
  photo: SafeResourceUrl;
  userData: string;

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  constructor(private router: Router, private blogService: BlogService, private sanitizer: DomSanitizer, private authService: AuthService) {
    this.addBlogForm = new FormGroup({
      bTitle: new FormControl('', [Validators.required]),
      bStory: new FormControl('', [Validators.required]),
      readTime: new FormControl('', [Validators.required])
    });
  }

  add() {
    if (this.addBlogForm.valid) {
      var userId = this.authService.getId();
      const prod = new Blog(
        this.blogService.blogId,
        this.addBlogForm.value.bTitle,
        this.addBlogForm.value.bStory,
        this.addBlogForm.value.readTime,
        this.photo,
        userId  // Pass the user ID to the add() method
      )
      this.blogService.add(prod);
      this.router.navigate(['all-blogs']);
    };
  }


  ngOnInit() {
  }

}
