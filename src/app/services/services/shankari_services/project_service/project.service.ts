import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { observable, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Project } from '../project';
import { Reward } from '../reward';
import { Transaction } from '../transaction';
import { Update } from '../update';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  user: string;

  private projectRef = firebase.firestore().collection("Projects");
  prjrefId = firebase.firestore().collection("Projects").doc().id;
  private transactionRef = firebase.firestore().collection("Transaction");
  txnId = firebase.firestore().collection("Transaction").doc().id


  constructor(private authService: AuthService) {
    // this.user = this.authService.getCurrentUser().email;
  }
  createPrj(p: Project) {
    // Let firebase auto generate id
    this.projectRef.doc(p.prjId).set({
      prjName: p.title,
      category: p.category,
      story: p.story,
      risk: p.risk,
      target: p.target,
      fundingType: p.fundingType,
      prjType: p.prjType,
      startDate: new Date(p.startDate),
      endDate: new Date(p.endDate),
      userID: p.userId,
      status: p.status,
      aiScore: p.aiScore
    }).then(doc => {
      if (p.image) {
        const dataUrl = p.image.changingThisBreaksApplicationSecurity;
        const imageRef = firebase.storage().ref().child(p.prjId);
        imageRef.putString(dataUrl,
          firebase.storage.StringFormat.DATA_URL).then(() => {
            const ref = this.projectRef.doc(p.prjId);
            ref.update({ image: p.prjId });
          });
      }
    })
  }

  createReward(r: Reward) {
    // Let firebase auto generate id
    firebase.firestore().collection("Projects/" + r.prjId + "/Rewards").add({
      rewardTitle: r.rewardtitle,
      details: r.rewardDetail,
      price: r.price,
      projectId: r.prjId,
      estimateDelieveryDate: new Date(r.estDelieveryDate)
    });
  }

  createUpdates(u: Update) {
    // Let firebase auto generate id
    firebase.firestore().collection("Projects/" + u.prjId + "/Updates").add({
      updateTitle: u.updatetitle,
      updateDetails: u.updateDetail,
      projectId: u.prjId
    });
  }

  getPrjById(id: string): Observable<any> {
    return new Observable((observer) => {
      this.projectRef.doc(id).get().then((doc) => {
        let data = doc.data();
        let p = new Project(doc.id, data.prjName, data.story, data.risk, data.category, data.target,
          data.startDate.toDate(), data.endDate.toDate(), data.prjType,
          data.fundingType, data.userID, data.status, data.image, data.aiScore)

        if (data.image) {
          p.imgPath = data.image;
          const imageRef = firebase.storage().ref().child(data.image);
          imageRef.getDownloadURL()
            .then(url => {
              p.image = url;
              // Tell the subscriber that image is updated
              observer.next(p);
              console.log('Image is ' + p.image);
            }).catch(error => {
              console.log('Error: Read image fail ' + error);
            });
        }
        observer.next(p)
      })
    })
  }

  getPrjByUser(userID: string): Observable<any> {
    return new Observable((observer) => {
      this.projectRef.where("userID", "==", userID).onSnapshot((collection) => {
        let array = [];
        collection.forEach(doc => {
          let project = new Project(doc.id, doc.data().prjName, doc.data().story, doc.data().risk, doc.data().category, doc.data().target, doc.data().startDate.toDate(), doc.data().endDate.toDate(), doc.data().prjType, doc.data().fundingType, doc.data().userID, doc.data().status, doc.data().image, doc.data().aiScore);
          // console.log(project)

          let dataImg = doc.data().image
          if (dataImg) {
            project.imgPath = dataImg;
            const imageRef = firebase.storage().ref().child(dataImg);
            imageRef.getDownloadURL()
              .then(url => {
                project.image = url;
              }).catch(error => {
                console.log('Error: Read image fail ' + error);
              });
          }

          array.push(project);
        });
        observer.next(array);
      });
    });
  }

  updateProject(p: Project) {
    const ref = this.projectRef.doc(p.prjId);
    ref.update({
      title: p.title,
      story: p.story,
      risk: p.risk,
      category: p.category
    }).then(doc => {
      if (p.image) {
        const dataUrl = p.image.changingThisBreaksApplicationSecurity;
        const imageRef = firebase.storage().ref().child(p.prjId);
        imageRef.putString(dataUrl,
          firebase.storage.StringFormat.DATA_URL).then(() => {
            const ref = this.projectRef.doc(p.prjId);
            ref.update({ image: p.prjId });
          });
      }
    })
  }

  getUpdates(prjId: string): Observable<any> {
    return new Observable((observer) => {
      firebase.firestore().collection("Projects/" + prjId + "/Updates").onSnapshot((collection) => {
        let array = [];
        collection.forEach(doc => {
          let u = new Update(doc.data().updateTitle, doc.data().updateDetails, doc.data().projectId, doc.id);
          // console.log(u)

          array.push(u);
        });
        observer.next(array);
      });
    });
  }

  getUpdateById(updid: string, prjId: string): Observable<any> {
    return new Observable((observer) => {
      firebase.firestore().collection("Projects/" + prjId + "/Updates").doc(updid).get().then((doc) => {
        // let data = doc.data();
        let u = new Update(doc.data().updateTitle, doc.data().updateDetails, doc.data().projectId, doc.id);
        observer.next(u)
      })
    })
  }

  editUpdate(u: Update) {
    // const ref = this.projectRef.doc(p.prjId);
    firebase.firestore().collection("Projects/" + u.prjId + "/Updates").doc(u.updateID).update({
      updateTitle: u.updatetitle,
      updateDetails: u.updateDetail,
      projectId: u.prjId
    })
  }

  getRewards(prjId: string): Observable<any> {
    return new Observable((observer) => {
      firebase.firestore().collection("Projects/" + prjId + "/Rewards").onSnapshot((collection) => {
        let array = [];
        collection.forEach(doc => {
          let data = doc.data()
          let r = new Reward(data.rewardTitle, data.details, data.price, data.projectId, data.estimateDelieveryDate.toDate(), doc.id);
          // console.log(u)

          array.push(r);
        });
        observer.next(array);
      });
    });
  }

  getTxnedAmt(prjId: string): Observable<any> {
    return new Observable((observer) => {
      firebase.firestore().collection("Transaction").where("prjId", "==", prjId).onSnapshot((collection) => {
        let totalAmt = 0;
        collection.forEach(doc => {
          totalAmt += parseFloat(doc.data().txnAmt)
        });
        observer.next(totalAmt);
      });
    });
  }
  newTxn_camp(t: Transaction) {
    // Let firebase auto generate id
    this.transactionRef.doc(t.txnId).set(({
      prjId: t.prjId,
      rewardId: t.rewardId,
      txnAmt: t.txnAmt,
      type: t.type,
      status: t.status,
      userId: t.userId
    }))
  }
  newTxn_don(t: Transaction) {
    // Let firebase auto generate id
    this.transactionRef.doc(t.txnId).set(({
      prjId: t.prjId,
      // rewardId: t.rewardId,
      txnAmt: t.txnAmt,
      type: t.type,
      status: t.status,
      userId: t.userId
    }))
  }

}

