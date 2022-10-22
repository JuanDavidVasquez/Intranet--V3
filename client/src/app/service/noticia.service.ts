import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Noticia } from "../models/noticia";



@Injectable()
export class NoticiaService{
	public url:string;
	public stats;

	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	saveNoticia(noticia: Noticia): Observable<any>{
		let params = JSON.stringify(noticia);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url+'subir-noticia', params, {headers:headers});
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

	updateNoticia(noticia: Noticia):Observable<any>{
		let params = JSON.stringify(noticia);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'update-noticia/'+noticia._id, params, {headers: headers});
	}

	getNoticias():Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'noticias/', {headers: headers});
	}

	getNoticia(id: string):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'noticia/'+id, {headers: headers});
	}

}