import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard]  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoggedGuard] },
  { path: 'cadastro', loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule', canActivate: [LoggedGuard] },
  { path: 'sair', loadChildren: './pages/sair/sair.module#SairPageModule', canActivate: [AuthGuard]},
  { path: 'sobre', loadChildren: './pages/sobre/sobre.module#SobrePageModule' },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  { path: 'senha', loadChildren: './pages/senha/senha.module#SenhaPageModule' },
  { path: 'telefone', loadChildren: './pages/telefone/telefone.module#TelefonePageModule' },
  { path: 'email', loadChildren: './pages/email/email.module#EmailPageModule' },
  { path: 'prestador', loadChildren: './pages/prestador/prestador.module#PrestadorPageModule' },
  { path: 'prestador-details', loadChildren: './pages/prestador-details/prestador-details.module#PrestadorDetailsPageModule' },
  { path: 'busca', loadChildren: './pages/busca/busca.module#BuscaPageModule' }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
