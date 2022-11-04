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
import { EditPerfilComponent } from './components/edit-perfil/edit-perfil.component';
import { PerfilGeneralComponent } from './components/perfil-general/perfil-general.component';
import { PerfilAcademicoComponent } from './components/perfil-academico/perfil-academico.component';
import { PerfilAcademicoEditComponent } from './components/perfil-academico-edit/perfil-academico-edit.component';
import { PerfilSaludComponent } from './components/perfil-salud/perfil-salud.component';
import { PerfilGeneralidadesComponent } from './components/perfil-generalidades/perfil-generalidades.component';
import { EditSaludComponent } from './components/edit-salud/edit-salud.component';
import { EditGeneralidadComponent } from './components/edit-generalidad/edit-generalidad.component';
import { PerfilMentiusComponent } from './components/perfil-mentius/perfil-mentius.component';
import { OfertaLaboralComponent } from './components/oferta-laboral/oferta-laboral.component';
import { OfertaLaboralEditComponent } from './components/oferta-laboral-edit/oferta-laboral-edit.component';
import { BuscarAspiranteComponent } from './components/buscar-aspirante/buscar-aspirante.component';
import { OfertasLaboralesComponent } from './components/ofertas-laborales/ofertas-laborales.component';
import { PortalEmpleosComponent } from './components/portal-empleos/portal-empleos.component';
import { BuscarOfertaComponent } from './components/buscar-oferta/buscar-oferta.component';
import { PortalComponent } from './components/portal/portal.component';



const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent },
  {path: 'register', component:RegisterComponent },
  {path: 'perfil-mentius/:id', component:PerfilMentiusComponent},
  {path: 'perfil-general', component:PerfilGeneralComponent},
  {path: 'perfil/:id', component:PerfilComponent},
  {path: 'edit-perfil-laboral/:id', component:EditPerfilComponent},
  {path: 'perfil-academico/:id', component:PerfilAcademicoComponent},
  {path: 'perfil-academico-edit/:id', component:PerfilAcademicoEditComponent},
  {path: 'salud/:id', component:PerfilSaludComponent},
  {path: 'salud-edit/:id', component:EditSaludComponent},
  {path: 'perfil-generalidades/:id', component:PerfilGeneralidadesComponent},
  {path: 'edit-generalidades/:id', component:EditGeneralidadComponent},
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
  {path: 'oferta-laboral', component:OfertaLaboralComponent},
  {path: 'oferta-laboral-edit/:id', component:OfertaLaboralEditComponent},
  {path: 'ofertas-laborales', component:OfertasLaboralesComponent},
  {path: 'buscar-aspirante/:search', component:BuscarAspiranteComponent},
  {path: 'portal-de-empleos', component:PortalEmpleosComponent},
  {path: 'buscar-oferta/:search', component:BuscarOfertaComponent},
  {path: 'portal-de-empleo', component:PortalComponent},
  {path: '**', component:ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
