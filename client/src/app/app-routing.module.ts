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
import { NoticiasComponent } from './components/noticias/noticias.component';
import { RegisterNoticiaComponent } from './components/register-noticia/register-noticia.component';
import { CargarImagenDeNoticiaComponent } from './components/cargar-imagen-de-noticia/cargar-imagen-de-noticia.component';
import { EditNoticiaComponent } from './components/edit-noticia/edit-noticia.component';
import { RrhhComponent } from './components/rrhh/rrhh.component';
import { ReclutamientoComponent } from './components/reclutamiento/reclutamiento.component';
import { RegisterAspiranteComponent } from './components/register-aspirante/register-aspirante.component';
import { EditAspiranteComponent } from './components/edit-aspirante/edit-aspirante.component';
import { PerfilComponent } from './components/perfil/perfil.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent },
  {path: 'register', component:RegisterComponent },
  {path: 'perfil', component:PerfilComponent},
  {path: 'home', component:HomeComponent},
  {path: 'mis-datos', component:UserEditComponent},
  {path: 'gente', component:UsersComponent},
  {path: 'gente/:page', component:UsersComponent},
  {path: 'Mentius', component:MentiusComponent},
  {path: 'certificado-laboral', component:CertificadoLaboralComponent},
  {path: 'noticias', component:NoticiasComponent},
  {path: 'register-noticia', component:RegisterNoticiaComponent},
  {path: 'cargar-imagen-noticia/:id', component:CargarImagenDeNoticiaComponent},
  {path: 'cargar-imagen-noticia', component:CargarImagenDeNoticiaComponent},
  {path: 'dashboard-noticias', component:EditNoticiaComponent},
  {path: 'recursos-humanos', component:RrhhComponent},
  {path: 'reclutamiento', component:ReclutamientoComponent},
  {path: 'registro-de-aspirante', component:RegisterAspiranteComponent},
  {path: 'edit-aspirante/:id', component:EditAspiranteComponent},
  {path: 'edit-aspirante', component:EditAspiranteComponent},
  {path: '**', component:ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
