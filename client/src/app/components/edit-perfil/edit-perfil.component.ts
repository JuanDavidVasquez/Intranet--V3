import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PerfilLaboral } from 'src/app/models/perfilLaboral';
import { PerfilLaboralService } from 'src/app/service/perfilLaboral.service';
import { UploadService } from 'src/app/service/upload.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { MomentModule } from 'angular2-moment';      ;

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.component.html',
  styleUrls: ['./edit-perfil.component.css'],
  providers: [PerfilLaboralService, UploadService, UserService]
})
export class EditPerfilComponent implements OnInit {
	public miFecha : Date;
	public title: string;
	public user: User;
	public perfilLaboral: PerfilLaboral;
	public status: string;
	public url: string;
	public token;
	public identity;
	public plaboral;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _perfilLaboralService:PerfilLaboralService,
	private _uploadService: UploadService,
    private _userService:UserService
  ) { 
    this.title = 'Editar de perfil laboral';
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
	
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this._route.params.subscribe(params => {
			let id = params['id'];
      this.getPerfilLaboral(id,this.token);
	});
  }

  getPerfilLaboral(id,token){
	this._perfilLaboralService.getPerfilLaboral(id,token).subscribe(
		response => {
			this.perfilLaboral = response.perfilLaboral;
		},
		error => {
			console.log(<any>error);
		}
	)
}
onSubmit(){
	this._perfilLaboralService.updatePerfilLaboral(this.perfilLaboral,this.token).subscribe(
		response => {
			if(!response.perfilLaboral){
				this.status = 'error';
			}else{
				this.status = 'success';
				localStorage.setItem('plaboral', JSON.stringify(this.perfilLaboral));
					this.plaboral = this.perfilLaboral;
				// SUBIDA DE IMAGEN DE USUARIO
				this._uploadService.makeFileRequest(this.url+'upload-image-perfil-laboral/'+this.perfilLaboral._id, [], this.filesToUpload,this.token, 'certificadoLaboral')
								   .then((result: any) => {
										   this.perfilLaboral.certificadoLaboral = result.perfilLaboral.certificadoLaboral;
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