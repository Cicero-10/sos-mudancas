import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sair',
  templateUrl: './sair.page.html',
  styleUrls: ['./sair.page.scss'],
})
export class SairPage implements OnInit {

 
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async logout(){
    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    }
  }

}
