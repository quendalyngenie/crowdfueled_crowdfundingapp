import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { Blog } from './blog';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogsRef = firebase.firestore().collection("Blogs");
  blogId = firebase.firestore().collection("Blogs").doc().id

  constructor() { }

  getBlogs(): Observable<any> {
    return new Observable((observer) => {
      this.blogsRef.onSnapshot((querySnapshot) => {
        let blogs = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          let p = new Blog(doc.id, data.bTitle, data.bStory, data.readTime, data.bImage, data.userId);
          if (data.bImage) {
            p.imgPath = data.bImage;
            const imgRef = firebase.storage().ref().child(data.bImage);
            imgRef.getDownloadURL()
              .then(url => {
                p.bImage = url;
              }).catch(error => {
                console.log('Error: Read image fail ' + error);
              });
          }
          blogs.push(p);
        });
        observer.next(blogs);
      });
    });
  }
  add(p: Blog) {
    // Let firebase auto generate id
    this.blogsRef.doc(p.blogId).set({
      bTitle: p.bTitle,
      bStory: p.bStory,
      readTime: p.readTime,
      userId: p.userId
    }).then(doc => {
      if (p.bImage) {
        const dataUrl = p.bImage.changingThisBreaksApplicationSecurity;
        const imageRef = firebase.storage().ref().child(p.blogId);
        imageRef.putString(dataUrl,
          firebase.storage.StringFormat.DATA_URL).then(() => {
            const ref = this.blogsRef.doc(p.blogId);
            ref.update({ bImage: p.blogId });
          });
      }
    });
  }
  getBlogById(blogId: string): Observable<any> {
    return new Observable((observer) => {
      this.blogsRef.doc(blogId).get().then((doc) => {
        let data = doc.data();
        let p = new Blog(doc.id, data.bTitle, data.bStory, data.readTime, data.bImage, data.userId);
        if (data.bImage) {
          p.bImage = data.bImage;
          const imgRef = firebase.storage().ref().child(data.bImage);
          imgRef.getDownloadURL()
            .then(url => {
              p.bImage = url;
              // Tell the subscriber that image is updated
              observer.next(p);
              console.log('Image is ' + p.bImage);
            }).catch(error => {
              console.log('Error: Read image fail ' + error);
            });
        }
        observer.next(p);
      });
    });
  }

  getBlogByUser(userId: string): Observable<any> {
    return new Observable((observer) => {
      this.blogsRef.where("userId", "==", userId).onSnapshot((collection) => {
        let array = [];
        collection.forEach(doc => {
          let blog = new Blog(doc.id, doc.data().bTitle, doc.data().bStory, doc.data().readTime, doc.data().bImage, doc.data().userId);

          let dataImg = doc.data().bImage
          if (dataImg) {
            blog.imgPath = dataImg;
            const imageRef = firebase.storage().ref().child(dataImg);
            imageRef.getDownloadURL()
              .then(url => {
                blog.bImage = url;
              }).catch(error => {
                console.log('Error: Read image fail ' + error);
              });
          }

          array.push(blog);
        });
        observer.next(array);
      });
    });
  }

  update(p: Blog) {
    console.log(p);
    const ref = this.blogsRef.doc(p.blogId);
    ref.update({
      bTitle: p.bTitle,
      bStory: p.bStory,
      readTime: p.readTime
    }).then(doc => {
      if (p.bImage) {
        const dataUrl = p.bImage.changingThisBreaksApplicationSecurity;
        const imageRef = firebase.storage().ref().child(p.blogId);
        imageRef.putString(dataUrl,
          firebase.storage.StringFormat.DATA_URL).then(() => {
            const ref = this.blogsRef.doc(p.blogId);
            ref.update({ bImage: p.blogId });
          });
      }
    });
  }
  delete(p: Blog) {
    const ref = this.blogsRef.doc(p.blogId);
    ref.get().then(doc => {
    if (doc.exists)
    ref.delete();
    });
    }

}