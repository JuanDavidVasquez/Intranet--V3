import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Noticia } from "../models/noticia";



@Injectable()
export class NoticiaService{
	public url:string;
	public identity;
	public token;
	public stats;

	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	register(noticia: Noticia): Observable<any>{
		let params = JSON.stringify(noticia);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url+'register', params, {headers:headers});
	}

	signup(noticia, gettoken = null): Observable<any>{
		if(gettoken != null){
			noticia.gettoken = gettoken;
		}

		let params = JSON.stringify(noticia);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'login', params, {headers: headers});
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

	getToken(){
		let token = localStorage.getItem('token');

		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
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

	getCounters(noticiaId = null): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',this.getToken());

		if(noticiaId != null){
			return this._http.get(this.url+'counters/'+noticiaId, {headers: headers});
		}else{
			return this._http.get(this.url+'counters', {headers: headers});
		}

	}

	updateNoticia(noticia: Noticia):Observable<any>{
		let params = JSON.stringify(noticia);
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',this.getToken());

		return this._http.put(this.url+'update-noticia/'+noticia._id, params, {headers: headers});
	}

	getNoticias():Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',this.getToken());

		return this._http.get(this.url+'noticias/', {headers: headers});
	}

	getNoticia(id: string):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',this.getToken());

		return this._http.get(this.url+'noticia/'+id, {headers: headers});
	}

}