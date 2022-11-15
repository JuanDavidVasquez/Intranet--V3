import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Vacaciones } from "../models/vacaciones";


@Injectable()
export class VacacionesService{
	public url:string;
	public stats;
    public vacacionesid;
	public identity;
	public token;
    
	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	saveVacaciones(vacaciones: Vacaciones, token): Observable<any>{
		let params = JSON.stringify(vacaciones);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		.set('Authorization', token);

		return this._http.post(this.url+'subir-vacaciones', params, {headers:headers});
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

	updateVacaciones(vacaciones: Vacaciones,token):Observable<any>{
		let params = JSON.stringify(vacaciones);
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.put(this.url+'update-vacaciones/'+vacaciones._id, params, {headers: headers});
	}
	getVacacioness():Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'vacacioness/', {headers: headers});
	}

	getVacaciones(id,token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'vacaciones/'+id, {headers: headers});
	}

    getVacacionesid(token){
		let vacacionesid = JSON.parse(localStorage.getItem('vacacionesid'))
		.set('Authorization', token);

		if(vacacionesid != "undefined"){
			this.vacacionesid = vacacionesid;
		}else{
			this.vacacionesid = null;
		}

		return this.vacacionesid;
	}
	searchVacaciones(searchString):Observable<any>{
		return this._http.get(this.url+'search-vacaciones/'+searchString);
	}
}