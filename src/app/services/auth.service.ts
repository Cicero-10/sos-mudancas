import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore
    ) { }

  login(user: User){
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User){
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout(){
    return this.afa.auth.signOut();
  }

  getAuth(){
    return this.afa.auth;
  }
  getAll(){
    return this.afs.collection('users').valueChanges();
  }
}
