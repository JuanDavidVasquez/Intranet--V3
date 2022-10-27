import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { PerfilLaboral } from "../models/perfilLaboral";


@Injectable()
export class PerfilLaboralService{
	public url:string;
	public stats;
    public perfilLaboralid;
	public identity;
	public token;
    
	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	savePerfilLaboral(perfilLaboral: PerfilLaboral, token): Observable<any>{
		let params = JSON.stringify(perfilLaboral);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		.set('Authorization', token);

		return this._http.post(this.url+'register-perfil-laboral', params, {headers:headers});
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

	updatePerfilLaboral(perfilLaboral: PerfilLaboral,token):Observable<any>{
		let params = JSON.stringify(perfilLaboral);
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.put(this.url+'update-perfil-laboral/'+perfilLaboral._id, params, {headers: headers});
	}

	getPerfilLaborals(token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'perfils-laborals/', {headers: headers});
	}

	getPerfilLaboral(id,token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'perfil-laboral/'+id, {headers: headers});
	}

    getPerfilLaboralUser(user, token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'perfil-laboral-user/'+user, {headers: headers});
	}

    getPerfilLaboralid(token){
		let perfilLaboralid = JSON.parse(localStorage.getItem('perfilLaboralid'))
		.set('Authorization', token);

		if(perfilLaboralid != "undefined"){
			this.perfilLaboralid = perfilLaboralid;
		}else{
			this.perfilLaboralid = null;
		}

		return this.perfilLaboralid;
	}
}