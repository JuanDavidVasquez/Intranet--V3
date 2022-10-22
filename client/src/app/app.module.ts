import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
