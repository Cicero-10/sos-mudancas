import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Prestador } from '../interfaces/prestador';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {
  private prestadorCollection: AngularFirestoreCollection<Prestador>;

  constructor( private afs: AngularFirestore) { 
    this.prestadorCollection = this.afs.collection<Prestador>('Prestador');
  }

  getPrestadores(){
    return this.prestadorCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    )
  }

  addPrestador(prestador: Prestador){
    return this.prestadorCollection.add(prestador);
  }

  getPrestador(id: string){
    return this.prestadorCollection.doc<Prestador>(id).valueChanges();
  }

  updatePrestador(id: string, prestador: Prestador){
    return this.prestadorCollection.doc<Prestador>(id).update(prestador);
  }
  deletePrestador(id: string){
    return this.prestadorCollection.doc(id).delete();
  }


}
