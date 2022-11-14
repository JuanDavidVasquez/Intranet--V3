import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { UploadService } from 'src/app/service/upload.service';
import { OfertaLaboral } from 'src/app/models/ofertaLaboral';
import { OfertaLaboralService } from 'src/app/service/ofertaLaboral.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
import { Postulacion } from 'src/app/models/postulacion';
import { PostulacionService } from 'src/app/service/postulacion.service';

declare var $: any;

@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styleUrls: ['./postulacion.component.css'],
  providers: [UserService, PostulacionService, OfertaLaboralService, UploadService],
})
export class PostulacionComponent implements OnInit {
  public title: string;
  public token;
  public identity;
  public ofertaLaboral: OfertaLaboral;
  public postulacion: Postulacion;
  fecha:any;
  public status: string;
  public url: string;
  public pOfertaLaboral;
  public prueba:any;

  constructor(
    private _ofertaLaboralService: OfertaLaboralService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _uploadService: UploadService,
    private _postulacionService:PostulacionService
  ) {
    this.title = 'Ofertas laborales Mentius';
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.postulacion = new Postulacion("",this.prueba,Date(),"","");
    console.log(this.prueba+'test');
    this._route.params.subscribe((params) => {
      this.prueba =params['id'];
      console.log(this.prueba);
      this.postulacion = new Postulacion("",this.prueba,Date(),"","");
    });
  }
 
  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this.getOfertaLaboral(id, this.token);
    });
    this.fecha = Date();
  }
  getOfertaLaboral(id, token) {
    this._ofertaLaboralService.getOfertaLaboral(id, token).subscribe(
      (response) => {
        this.ofertaLaboral = response.ofertaLaboral;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
  onSubmit(form:any){
	  this._postulacionService.savePostulacion(this.postulacion,this.token).subscribe(
      response =>{
        if(response.postulacion){
          this.token = response.token;
          this.status = 'success';
          form.reset();
          this._router.navigate(['/portal-de-empleos']);
        }else{
          this.status = 'error';
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }
  ngDoCheck(){
  	this.identity = this._userService.getIdentity();
  }
}
