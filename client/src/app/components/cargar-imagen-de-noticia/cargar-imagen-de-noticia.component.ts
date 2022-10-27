import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { NoticiaService } from 'src/app/service/noticia.service';
import { UploadService } from 'src/app/service/upload.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cargar-imagen-de-noticia',
  templateUrl: './cargar-imagen-de-noticia.component.html',
  styleUrls: ['./cargar-imagen-de-noticia.component.css'],
  providers: [NoticiaService, UploadService]
})
export class CargarImagenDeNoticiaComponent implements OnInit {

    public title: string;
	public noticia: Noticia;
	public status: string;
	public url: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _noticiaService: NoticiaService,
		private _uploadService: UploadService
	){
		this.title = 'Actualizar noticia';
		this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log(this.noticia);
		console.log('noticia-edit.component se ha cargado!!');
		
		this._route.params.subscribe(params => {
			let id = params['id'];
			this.getNoticia(id);
		});
	}
	getNoticia(id){
		this._noticiaService.getNoticia(id).subscribe(
			response => {
				this.noticia = response.noticia;
			},
			error => {
				console.log(<any>error);
			}
		)
	}
	onSubmit(){
		console.log(this.noticia);
		this._noticiaService.updateNoticia(this.noticia).subscribe(
			response => {
				if(!response.noticia){
					this.status = 'error';
				}else{
					this.status = 'success';
					// SUBIDA DE IMAGEN DE USUARIO
					this._uploadService.make2FileRequest(this.url+'upload-image-noticia/'+this.noticia._id, [], this.filesToUpload, 'image')
									   .then((result: any) => {
									   		this.noticia.image = result.noticia.image;
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