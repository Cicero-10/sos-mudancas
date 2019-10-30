import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Prestador } from 'src/app/interfaces/prestador';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PrestadorService } from 'src/app/services/prestador.service';

@Component({
  selector: 'app-prestador',
  templateUrl: './prestador.page.html',
  styleUrls: ['./prestador.page.scss'],
})
export class PrestadorPage implements OnInit {
  private prestador: Prestador = {};
  public loading: any;
  private prestadorId: string = null;
  private prestadorSubscrition: Subscription;



  constructor(
    private LoadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private prestadorService: PrestadorService,
    private navCtrl: NavController
  ) {
    this.prestadorId = this.activeRoute.snapshot.params['id'];

    if (this.prestadorId) this.loadPrestador();
  }

  ngOnInit() { }

  loadPrestador() {
    this.prestadorSubscrition = this.prestadorService.getPrestador(this.prestadorId).subscribe(data => {
      this.prestador = data;
    });
  }

  async registerPres() {
    await this.presentLoading();
    this.prestador.userId = this.authService.getAuth().currentUser.uid;

    if (this.prestadorId) {
      try {
        await this.prestadorService.updatePrestador(this.prestadorId, this.prestador);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast("Erro ao tentar salvar");
        this.loading.dismiss();
      }
    } else {
      this.prestador.createdAt = new Date().getTime();
      try {
        await this.prestadorService.addPrestador(this.prestador);
        await this.loading.dismiss();
        
        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast("Erro ao tentar salvar");
        this.loading.dismiss();
      }
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
