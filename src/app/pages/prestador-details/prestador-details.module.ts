import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrestadorDetailsPage } from './prestador-details.page';

const routes: Routes = [
  {
    path: '',
    component: PrestadorDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrestadorDetailsPage]
})
export class PrestadorDetailsPageModule {}
