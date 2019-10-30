import { Component, OnInit } from '@angular/core';
import { Prestador } from 'src/app/interfaces/prestador';
import { Subscription } from 'rxjs';
import { PrestadorService } from 'src/app/services/prestador.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage implements OnInit {

  private prestadores = new Array<Prestador>();
  private prestadorSubscrition: Subscription;

  constructor(private prestadorService: PrestadorService) { 
    this.prestadorSubscrition = this.prestadorService.getPrestadores().subscribe(data => {
      this.prestadores = data;
    });
  }

  ngOnInit() {
  }


  ngOnDestroy(){
    this.prestadorSubscrition.unsubscribe();
  }

}
