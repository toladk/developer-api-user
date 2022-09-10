import { ApipagesComponent } from './components/pages/apipages/apipages.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { MainComponent } from './components/layouts/main/main.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'main',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'main',
    component : MainComponent,
    children : [
      {
        path : '',
        redirectTo : 'landing',
        pathMatch : 'full'
      },
      {
        path : 'landing',
        component : LandingComponent
      },
      {
        path: 'dashboard',
        component : DashboardComponent,
      },
      {
        path: 'apis',
        component : ApipagesComponent,
      },
      {
        path : '**',
        redirectTo : ''
      },
    ]
  },
  {
    path : '**',
    redirectTo : ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
