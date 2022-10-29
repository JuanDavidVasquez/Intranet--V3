import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Generalidad } from "../models/generalidad";


@Injectable()
export class GeneralidadService{
	public url:string;
	public stats;
    public generalidadid;
	public identity;
	public token;
    
	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	saveGeneralidad(generalidad: Generalidad, token): Observable<any>{
		let params = JSON.stringify(generalidad);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		.set('Authorization', token);

		return this._http.post(this.url+'register-generalidad', params, {headers:headers});
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

	updateGeneralidad(generalidad: Generalidad,token):Observable<any>{
		let params = JSON.stringify(generalidad);
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.put(this.url+'update-generalidad/'+generalidad._id, params, {headers: headers});
	}

	getGeneralidads(token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'generalidad-users/', {headers: headers});
	}

	getGeneralidad(id,token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'generalidad/'+id, {headers: headers});
	}

    getGeneralidadUser(user, token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'generalidad-user/'+user, {headers: headers});
	}

    getGeneralidadid(token){
		let generalidadid = JSON.parse(localStorage.getItem('generalidadid'))
		.set('Authorization', token);

		if(generalidadid != "undefined"){
			this.generalidadid = generalidadid;
		}else{
			this.generalidadid = null;
		}

		return this.generalidadid;
	}
}