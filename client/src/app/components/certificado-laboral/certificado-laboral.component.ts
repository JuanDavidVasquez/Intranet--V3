import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from 'src/app/service/user.service';
import { UploadService } from 'src/app/service/upload.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-certificado-laboral',
  templateUrl: './certificado-laboral.component.html',
  styleUrls: ['./certificado-laboral.component.css'],
  providers: [UserService, UploadService]
})
export class CertificadoLaboralComponent implements OnInit {
	API_ENDPOINT = 'http://localhost:3700/certificadolaboral/';
    public title: string;
	public user: User;
	public identity;
	public token;
	public status: string;
	public url: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _uploadService: UploadService
	){
		this.title = 'Actualizar mis datos';
		this.user = this._userService.getIdentity();
		this.identity = this.user;
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log(this.user._id);
		console.log('user-edit.component se ha cargado!!');
		console.log(this.user.fechaRetiro);
	}

	onSubmit(){
		console.log(this.user);
		this._userService.updateUser(this.user).subscribe(
			response => {
				if(!response.user){
					this.status = 'error';
				}else{
					this.status = 'success';
					localStorage.setItem('identity', JSON.stringify(this.user));
					this.identity = this.user;

					// SUBIDA DE IMAGEN DE USUARIO
					this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image')
									   .then((result: any) => {
									   		this.user.image = result.user.image;
									   		localStorage.setItem('identity', JSON.stringify(this.user));
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

	dowlandcertificado(users: User)
	{
		console.log(this.API_ENDPOINT + users.cedula);
	 	/* return this.http.post<User>(this.API_ENDPOINT + users.cedula, this.httpOptions);  */ 
		 /* return this.http.get(this.API_ENDPOINT + this.user.cedula);  */

		 return this._uploadService.dowlandcertificado(this.user).subscribe(res => {  
			console.log('Descargando archivo');
			window.location.href = "http://localhost:3700/certificadolaboral/" + this.user._id;
		   }
		   )

	}
}