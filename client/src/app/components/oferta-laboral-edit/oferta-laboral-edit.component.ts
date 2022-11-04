import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OfertaLaboral } from 'src/app/models/ofertaLaboral';
import { OfertaLaboralService } from 'src/app/service/ofertaLaboral.service';
import { UploadService } from 'src/app/service/upload.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
declare var $:any;


@Component({
  selector: 'app-oferta-laboral-edit',
  templateUrl: './oferta-laboral-edit.component.html',
  styleUrls: ['./oferta-laboral-edit.component.css'],
  providers: [OfertaLaboralService, UserService, UploadService]
})
export class OfertaLaboralEditComponent implements OnInit {

  public title: string;
	public user: User;
	public ofertaLaboral: OfertaLaboral;
	public status: string;
	public url: string;
	public token;
	public identity;
	public pOfertaLaboral;
  public fecha:any;
  public fechaEstimada:any;
  public dias:Number;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _ofertaLaboralService:OfertaLaboralService,
	  private _uploadService: UploadService,
    private _userService:UserService
  ) { 
    this.title = 'Editar de oferta';
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.fecha = Date(); 
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this._route.params.subscribe(params => {
			let id = params['id'];
      this.getOfertaLaboral(id,this.token);
	});
  $('body').css('background','url(../../../assets/img/perfiles/fondoAcademico.jpg)')
  .css('background-repeat','no-repeat');
  this.fechas();
  }
  fechas(){
    var fechaEstimada = new Date(this.fecha);
    var dias = 15; // Número de días a agregar
    fechaEstimada.setDate(fechaEstimada.getDate() + dias);
    console.log(fechaEstimada);
    return fechaEstimada;
  }
  getOfertaLaboral(id,token){
    this._ofertaLaboralService.getOfertaLaboral(id,token).subscribe(
      response => {
        this.ofertaLaboral = response.ofertaLaboral;
        
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  onSubmit(){
    this._ofertaLaboralService.updateOfertaLaboral(this.ofertaLaboral,this.token).subscribe(
      response => {
        if(!response.ofertaLaboral){
          this.status = 'error';
        }else{
          this.status = 'success';
          localStorage.setItem('pOfertaLaboral', JSON.stringify(this.ofertaLaboral));
            this.pOfertaLaboral = this.ofertaLaboral;
          // SUBIDA DE IMAGEN DE USUARIO
          this._uploadService.makeFileRequest(this.url+'upload-image-ofertaLaboral/'+this.ofertaLaboral._id, [], this.filesToUpload,this.token, 'image')
                     .then((result: any) => {
                         this.ofertaLaboral.image = result.ofertaLaboral.image;
                     });				
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
  
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }
  
  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }
}
