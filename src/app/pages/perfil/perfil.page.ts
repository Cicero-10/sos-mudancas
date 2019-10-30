import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.afs.collection('Users').valueChanges()
    .subscribe(val => console.log(val));
  }

}
