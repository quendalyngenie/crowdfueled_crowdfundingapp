import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { Reward } from '../reward';
import { RewardNotification } from '../notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private txnRef = firebase.firestore().collection("Transaction");
  private notificationRef = firebase.firestore().collection("Notification");

  getbyUserID(userid: string): Observable<any>{
    // console.log('hi: '+ userid);
    return new Observable((observer) =>{
      this.notificationRef.where("userId", "==", userid).onSnapshot((collection) =>{
        let array = [];
        collection.forEach(doc => {
          // totalAmt += doc.data().txnAmt
          // console.log(doc.id)
          let data = doc.data();
          // let name = ""
          firebase.firestore().collection("Projects").doc(data.prjId).get().then((prjdoc) => {
            let name = prjdoc.data().prjName;
            let img = prjdoc.data().image;
            // console.log(data.claimed);
          if(data.claimed == "notValid"){
            let n = new RewardNotification (doc.id,name,data.userId,data.unread,data.claimed,img)
            if(img){
              n.imgPath = img;
              const imageRef = firebase.storage().ref().child(img);
              imageRef.getDownloadURL()
                .then(url => {
                  n.image = url;
                  // Tell the subscriber that image is updated
                  array.push(n)
                  // console.log('Image is ' + p.image);
                }).catch(error => {
                  console.log('Error: Read image fail ' + error);
                });
            }
            // console.log(n)
            // array.push(n)
          }
          else{
            let estDelDate = new Date;
            firebase.firestore().collection("Projects/"+data.prjId+"/Rewards").doc(data.rewardId).get().then((prjdoc) => {
              let rewardname = prjdoc.data().rewardTitle;
              estDelDate = prjdoc.data().estimateDelieveryDate.toDate();
              let n = new RewardNotification (doc.id,name,data.userId,data.unread,data.claimed,img,rewardname,data.token,estDelDate);
              if(img){
                n.imgPath = img;
                const imageRef = firebase.storage().ref().child(img);
                imageRef.getDownloadURL()
                  .then(url => {
                    n.image = url;
                    // Tell the subscriber that image is updated
                    array.push(n)
                    // console.log('Image is ' + p.image);
                  }).catch(error => {
                    console.log('Error: Read image fail ' + error);
                  });
              }
              // console.log(n)
              // array.push(n)
            })
            
          }
          })
          
          // let n = 
          // array.push(n)
        });
        observer.next(array);
      });
    });
  }

  Update(u: RewardNotification){
    // const ref = this.projectRef.doc(p.prjId);
    this.notificationRef.doc(u.notId).update({
      unread: false
    })
  }

  getNotById(id: string): Observable<any>{
    return new Observable((observer) =>{
      this.notificationRef.doc(id).get().then((doc) =>{
        let data = doc.data();
        firebase.firestore().collection("Projects").doc(data.prjId).get().then((prjdoc) => {
          let name = prjdoc.data().prjName;
          let img = prjdoc.data().image;
          // console.log(data.claimed);
        if(data.claimed == "notValid"){
          let n = new RewardNotification (doc.id,name,data.userId,data.unread,data.claimed,img);
          if(img){
            n.imgPath = img;
            const imageRef = firebase.storage().ref().child(img);
            imageRef.getDownloadURL()
              .then(url => {
                n.image = url;
                // Tell the subscriber that image is updated
                observer.next(n)
                // console.log('Image is ' + p.image);
              }).catch(error => {
                console.log('Error: Read image fail ' + error);
              });
          }
          
        }
        else{
          let estDelDate = new Date;
          firebase.firestore().collection("Projects/"+data.prjId+"/Rewards").doc(data.rewardId).get().then((prjdoc) => {
            let rewardname = prjdoc.data().rewardTitle;
            estDelDate = prjdoc.data().estimateDelieveryDate.toDate();
            let n = new RewardNotification (doc.id,name,data.userId,data.unread,data.claimed,img,rewardname,data.token,estDelDate);
            if(img){
            n.imgPath = img;
            const imageRef = firebase.storage().ref().child(img);
            imageRef.getDownloadURL()
              .then(url => {
                n.image = url;
                // Tell the subscriber that image is updated
                observer.next(n)
                // console.log('Image is ' + p.image);
              }).catch(error => {
                console.log('Error: Read image fail ' + error);
              });
          }
          })
        }
        
        })
        
      })
    })
  }

  // getSuccessfulTxn(userID: string): Observable<any>{
  //   return new Observable((observer) =>{
  //     this.txnRef.where("userId", "==", userID).where("status", "==", "transfered").onSnapshot((collection) =>{
  //       let array = [];
  //       let prjName = ""
  //       collection.forEach(doc => {
  //         let prjid = doc.data().prjId;
  //         let rewardID = doc.data().rewardId;
  //         let token = doc.data().token;
  //         firebase.firestore().collection("Projects").doc(prjid).get().then((prjdoc) =>{
  //           prjName = prjdoc.data().prjName;
  //         })
  //         firebase.firestore().collection("Projects/"+prjid+"/Rewards").doc(rewardID).get().then((rewarddoc) =>{
  //           let data = rewarddoc.data()
  //           let r = new RewardNotification(prjName,userID,true,false,data.rewardTitle,token,data.estDelieveryDate.toDate())
  //           // array.push(r);
  //           this.notificationRef.add({
  //             prjName: r.prjName,
  //             userid: r.unread,
  //             unread: r.unread,
  //             claimed: r.claimed,
  //             rewardName: r.rewardName,
  //             token: r.rewardToken,
  //             estDelDate: r.rewardEstDel
  //           })
  //         })
          
  //       });
  //       observer.next(array);
  //     });
  //   });
  // }
}
