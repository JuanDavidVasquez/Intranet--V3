import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import  { MomentModule } from 'angular2-moment';

//Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { FooterComponent } from './components/footer/footer.component';
import { PortalComponent } from './components/portal/portal.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { GaleryComponent } from './components/galery/galery.component';
import { SliderComponent } from './components/slider/slider.component';
import { MentiusComponent } from './components/mentius/mentius.component';
import { MenuComprimidoComponent } from './components/menu-comprimido/menu-comprimido.component';
import { CertificadoLaboralComponent } from './components/certificado-laboral/certificado-laboral.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { RegisterNoticiaComponent } from './components/register-noticia/register-noticia.component';
import { MenusComponent } from './components/menus/menus.component';
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
import { NoticiaComponent } from './components/noticia/noticia.component';
import { OfertasLaboralesComponent } from './components/ofertas-laborales/ofertas-laborales.component';
import { PortalEmpleosComponent } from './components/portal-empleos/portal-empleos.component';
import { BuscarOfertaComponent } from './components/buscar-oferta/buscar-oferta.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    FooterComponent,
    PortalComponent,
    NosotrosComponent,
    GaleryComponent,
    SliderComponent,
    MentiusComponent,
    MenuComprimidoComponent,
    CertificadoLaboralComponent,
    NoticiasComponent,
    RegisterNoticiaComponent,
    MenusComponent,
    CargarImagenDeNoticiaComponent,
    EditNoticiaComponent,
    RrhhComponent,
    ReclutamientoComponent,
    RegisterAspiranteComponent,
    EditAspiranteComponent,
    PerfilComponent,
    EditPerfilComponent,
    PerfilGeneralComponent,
    PerfilAcademicoComponent,
    PerfilAcademicoEditComponent,
    PerfilSaludComponent,
    PerfilGeneralidadesComponent,
    EditSaludComponent,
    EditGeneralidadComponent,
    PerfilMentiusComponent,
    OfertaLaboralComponent,
    OfertaLaboralEditComponent,
    BuscarAspiranteComponent,
    NoticiaComponent,
    OfertasLaboralesComponent,
    PortalEmpleosComponent,
    BuscarOfertaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
