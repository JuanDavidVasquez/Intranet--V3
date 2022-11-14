import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Postulacion } from "../models/postulacion";

@Injectable()
export class PostulacionService{
	public url:string;
	public postulacionid;
	public identity;
	public token;
	public stats;

	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	savePostulacion(postulacion: Postulacion,token): Observable<any>{
		let params = JSON.stringify(postulacion);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		.set('Authorization', token);
							         

		return this._http.post(this.url+'register-postulacion', params, {headers:headers});
	}


	getStats(){
		let stats = JSON.parse(localStorage.getItem('stats'));

		if(stats != "undefined"){
			this.stats = stats;
		}else{
			this.stats = null;
		}

		return this.stats;
	}

	updatePostulacion(postulacion: Postulacion,token):Observable<any>{
		let params = JSON.stringify(postulacion);
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);
									   

		return this._http.put(this.url+'update-postulacion/'+postulacion._id, params, {headers: headers});
	}

	getPostulacions(token:string):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
							           .set('Authorization', token);
		return this._http.get(this.url+'postulacions/', {headers: headers});
						
	}

	getPostulacion(id: string,token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization', token);

		return this._http.get(this.url+'postulacion/'+id, {headers: headers});
	}
	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}
	getPostulacionid(){
		let postulacionid = JSON.parse(localStorage.getItem('postulacionid'));

		if(postulacionid != "undefined"){
			this.postulacionid = postulacionid;
		}else{
			this.postulacionid = null;
		}

		return this.postulacionid;
	}

	getToken(){
		let token = localStorage.getItem('token');

		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}

	
	searchPostulacion(searchString):Observable<any>{
		return this._http.get(this.url+'search-postulacion/'+searchString);
	}
}