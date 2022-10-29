import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Salud } from "../models/salud";


@Injectable()
export class SaludService{
	public url:string;
	public stats;
    public saludid;
	public identity;
	public token;
    
	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	saveSalud(salud: Salud, token): Observable<any>{
		let params = JSON.stringify(salud);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		.set('Authorization', token);

		return this._http.post(this.url+'register-salud', params, {headers:headers});
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

	updateSalud(salud: Salud,token):Observable<any>{
		let params = JSON.stringify(salud);
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.put(this.url+'update-salud/'+salud._id, params, {headers: headers});
	}

	getSaluds(token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'salud-users/', {headers: headers});
	}

	getSalud(id,token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'salud/'+id, {headers: headers});
	}

    getSaludUser(user, token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'salud-user/'+user, {headers: headers});
	}

    getSaludid(token){
		let saludid = JSON.parse(localStorage.getItem('saludid'))
		.set('Authorization', token);

		if(saludid != "undefined"){
			this.saludid = saludid;
		}else{
			this.saludid = null;
		}

		return this.saludid;
	}
}