import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';

//rutas
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { MentiusComponent } from './components/mentius/mentius.component';
import { CertificadoLaboralComponent } from './components/certificado-laboral/certificado-laboral.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent },
  {path: 'register', component:RegisterComponent },
  {path: 'home', component:HomeComponent},
  {path: 'mis-datos', component:UserEditComponent},
  {path: 'gente', component:UsersComponent},
  {path: 'gente/:page', component:UsersComponent},
  {path: 'Mentius', component:MentiusComponent},
  {path: 'certificado-laboral', component:CertificadoLaboralComponent},
  {path: '**', component:ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
