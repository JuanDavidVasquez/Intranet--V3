import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from 'src/app/service/user.service';
import { UploadService } from 'src/app/service/upload.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
declare var $:any;

@Component({
  selector: 'app-edit-colaborador',
  templateUrl: './edit-colaborador.component.html',
  styleUrls: ['./edit-colaborador.component.css'],
  providers: [UserService, UploadService]
})
export class EditColaboradorComponent implements OnInit {

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
		this.title = 'Actualizar datos Colaborador';
		this.user = this._userService.getIdentity();
		this.identity = this.user;
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit(){
    this._route.params.subscribe(params => {
			let id = params['id'];
			this.getUser(id);
		});
	}

  getUser(id){
		this._userService.getUser(id).subscribe(
			response => {
				this.user = response.user;
			},
			error => {
				console.log(<any>error);
			}
		)
	}

	onSubmit(){
		this._userService.updateColaborador(this.user,this.token).subscribe(
			response => {
				if(!response.user){
					this.status = 'error';
				}else{
					this.status = 'success';

					// SUBIDA DE IMAGEN DE USUARIO
					this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image')
									   .then((result: any) => {
									   		this.user.image = result.user.image;
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