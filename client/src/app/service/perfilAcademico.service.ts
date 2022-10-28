import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { PerfilAcademico } from "../models/perfilAcademico";


@Injectable()
export class PerfilAcademicoService{
	public url:string;
	public stats;
    public perfilAcademicoid;
	public identity;
	public token;
    
	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	savePerfilAcademico(perfilAcademico: PerfilAcademico, token): Observable<any>{
		let params = JSON.stringify(perfilAcademico);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		.set('Authorization', token);

		return this._http.post(this.url+'register-perfil-academico', params, {headers:headers});
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

	updatePerfilAcademico(perfilAcademico: PerfilAcademico,token):Observable<any>{
		let params = JSON.stringify(perfilAcademico);
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.put(this.url+'update-perfil-academico/'+perfilAcademico._id, params, {headers: headers});
	}

	getPerfilAcademicos(token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'perfils-academicos/', {headers: headers});
	}

	getPerfilAcademico(id,token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'perfil-academico/'+id, {headers: headers});
	}

    getPerfilAcademicoUser(user, token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'perfil-academico-user/'+user, {headers: headers});
	}

    getPerfilAcademicoid(token){
		let perfilAcademicoid = JSON.parse(localStorage.getItem('perfilAcademicoid'))
		.set('Authorization', token);

		if(perfilAcademicoid != "undefined"){
			this.perfilAcademicoid = perfilAcademicoid;
		}else{
			this.perfilAcademicoid = null;
		}

		return this.perfilAcademicoid;
	}
}