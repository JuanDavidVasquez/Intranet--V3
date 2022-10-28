import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PerfilAcademico } from 'src/app/models/perfilAcademico';
import { PerfilAcademicoService } from 'src/app/service/perfilAcademico.service';
import { UploadService } from 'src/app/service/upload.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
declare var $:any;

@Component({
  selector: 'app-perfil-academico-edit',
  templateUrl: './perfil-academico-edit.component.html',
  styleUrls: ['./perfil-academico-edit.component.css'],
  providers: [PerfilAcademicoService,UploadService, UserService]
})
export class PerfilAcademicoEditComponent implements OnInit {

  public title: string;
	public user: User;
	public perfilAcademico: PerfilAcademico;
	public status: string;
	public url: string;
	public token;
	public identity;
	public pAcademico;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _perfilAcademicoService:PerfilAcademicoService,
	  private _uploadService: UploadService,
    private _userService:UserService
  ) { 
    this.title = 'Editar de perfil academico';
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this._route.params.subscribe(params => {
			let id = params['id'];
      this.getPerfilAcademico(id,this.token);
	});
  $('body').css('background','url(../../../assets/img/perfiles/fondoAcademico.jpg)')
  .css('background-repeat','no-repeat');
  }
  getPerfilAcademico(id,token){
    this._perfilAcademicoService.getPerfilAcademico(id,token).subscribe(
      response => {
        this.perfilAcademico = response.perfilAcademico;
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  onSubmit(){
    this._perfilAcademicoService.updatePerfilAcademico(this.perfilAcademico,this.token).subscribe(
      response => {
        if(!response.perfilAcademico){
          this.status = 'error';
        }else{
          this.status = 'success';
          localStorage.setItem('pAcademico', JSON.stringify(this.perfilAcademico));
            this.pAcademico = this.perfilAcademico;
          // SUBIDA DE IMAGEN DE USUARIO
          this._uploadService.makeFileRequest(this.url+'upload-image-perfil-academico/'+this.perfilAcademico._id, [], this.filesToUpload,this.token, 'certificadoAcademico')
                     .then((result: any) => {
                         this.perfilAcademico.certificadoAcademico = result.perfilAcademico.certificadoAcademico;
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
