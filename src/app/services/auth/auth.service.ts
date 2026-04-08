import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  observeAuthState(arg0: (user: { email: any; }) => void) {
    throw new Error('Method not implemented.');
  }

  public _uid = new BehaviorSubject<any>(null);
  currentUser: any;

  constructor(
    private fireAuth: Auth,
    private apiService: ApiService
  ) { }

  async login(email: string, password: string): Promise<any> {
    try {
      console.log(email);
      const response = await signInWithEmailAndPassword(this.fireAuth, email, password);
      console.log(response);
      if (response?.user) {
        this.setUserData(response.user.uid);
      }
    } catch (e) {
      console.log(e);
      throw (e);
    }
  }

  getId() {
    const auth = getAuth();
    console.log('current user auth: ', auth.currentUser);
    this.currentUser = auth.currentUser;
    console.log(this.currentUser);
    return this.currentUser?.uid;
  }



  getCurrentUser() {
    const user = firebase.auth().currentUser
    return user;
  }

  setUserData(uid) {
    this._uid.next(uid);
  }

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async register(formValue) {
    try {
      const registeredUser = await createUserWithEmailAndPassword(this.fireAuth, formValue.email, formValue.password);
      console.log('registered user: ', registeredUser);
      const data = {
        email: formValue.email,
        name: formValue.username,
        uid: registeredUser.user.uid,
        photo: "",
        //'https://i.pravatar.cc/' + this.randomIntFromInterval(200, 400)
        dob: formValue.dob,
        type: formValue.type,
        status: 'active'
      };
      await this.apiService.setDocument(`users/${registeredUser.user.uid}`, data);
      const userData = {
        id: registeredUser.user.uid
      };
      return userData;
    } catch (e) {
      throw (e);
    }
  }

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.fireAuth, email);
    } catch (e) {
      throw (e);
    }
  }

  async logout() {
    try {
      await this.fireAuth.signOut();
      this._uid.next(null);
      this.currentUser = null;
      return true;
    } catch (e) {
      throw (e);
    }
  }

  checkAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.fireAuth, user => {
        console.log('auth user: ', user);
        resolve(user)
      });
    });
  }

  async getUserData(id) {
    const docSnap: any = await this.apiService.getDocById(`users/${id}`);
    if (docSnap?.exists()) {
      return docSnap.data();
    } else {
      throw ('No such document exists');
    }
  }

  getSpecificUserNameById(id) {
    return firebase.firestore().collection('users').doc(id).get().then(doc => {
      let name = doc.data().name;

      console.log(name);
      return name;
    });
  }

  getSUEById(id) {
    return firebase.firestore().collection('users').doc(id).get().then(doc => {
      let email = doc.data().email;

      console.log(email);
      return email;
    });
  }

  getSUTById(id) {
    return firebase.firestore().collection('users').doc(id).get().then(doc => {
      let type = doc.data().type;

      console.log(type);
      return type;
    });
  }

  getSUDOBById(id) {
    return firebase.firestore().collection('users').doc(id).get().then(doc => {
      let dob = doc.data().dob;

      console.log(dob);
      return dob;
    });
  }

  
  getUserbyType(id: string): Observable<any>{
    return new Observable((observer)=>{
      firebase.firestore().collection('users').doc(id).get().then((doc) =>{
        let data = doc.data();
        let type = data.type

        observer.next(type);
      })
    })
  }
}
