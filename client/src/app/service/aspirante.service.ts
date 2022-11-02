import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Aspirante } from "../models/aspirante";

@Injectable()
export class AspiranteService{
	public url:string;
	public aspiranteid;
	public identity;
	public token;
	public stats;

	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	saveAspirante(aspirante: Aspirante,token): Observable<any>{
		let params = JSON.stringify(aspirante);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		.set('Authorization', token);
							         

		return this._http.post(this.url+'register-aspirante', params, {headers:headers});
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

	updateAspirante(aspirante: Aspirante,token):Observable<any>{
		let params = JSON.stringify(aspirante);
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);
									   

		return this._http.put(this.url+'update-aspirante/'+aspirante._id, params, {headers: headers});
	}

	getAspirantes(token:string):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
							           .set('Authorization', token);
		return this._http.get(this.url+'aspirantes/', {headers: headers});
						
	}

	getAspirante(id: string,token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization', token);

		return this._http.get(this.url+'aspirante/'+id, {headers: headers});
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
	getAspiranteid(){
		let aspiranteid = JSON.parse(localStorage.getItem('aspiranteid'));

		if(aspiranteid != "undefined"){
			this.aspiranteid = aspiranteid;
		}else{
			this.aspiranteid = null;
		}

		return this.aspiranteid;
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

	
	searchAspirante(searchString):Observable<any>{
		return this._http.get(this.url+'search-aspirante/'+searchString);
	}
}