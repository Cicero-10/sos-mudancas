import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public user: any = {};
  public loading: any;

  constructor(
    private LoadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private afa: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
  }

  async register() {
    await this.presentLoading();

    try {
      const newUser = await this.afa.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
      const newUserObject = Object.assign({}, this.user);

      delete newUserObject.email;
      delete newUserObject.password;

      await this.afs.collection('Users').doc(newUser.user.uid).set(newUserObject);
      console.log("Cadastro realizado com sucesso");
    } catch (error) {
      console.error(error);
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.LoadingCtrl.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
