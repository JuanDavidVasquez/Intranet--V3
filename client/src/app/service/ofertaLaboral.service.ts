import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { OfertaLaboral } from "../models/ofertaLaboral";


@Injectable()
export class OfertaLaboralService{
	public url:string;
	public stats;
    public ofertaLaboralid;
	public identity;
	public token;
    
	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	saveOfertaLaboral(ofertaLaboral: OfertaLaboral, token): Observable<any>{
		let params = JSON.stringify(ofertaLaboral);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		.set('Authorization', token);

		return this._http.post(this.url+'subir-ofertaLaboral', params, {headers:headers});
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

	updateOfertaLaboral(ofertaLaboral: OfertaLaboral,token):Observable<any>{
		let params = JSON.stringify(ofertaLaboral);
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.put(this.url+'update-ofertaLaboral/'+ofertaLaboral._id, params, {headers: headers});
	}

	getOfertaLaborals():Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'ofertaLaborals/', {headers: headers});
	}

	getOfertaLaboral(id,token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'ofertaLaboral/'+id, {headers: headers});
	}

    getOfertaLaboralUser(user, token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'perfil-academico-user/'+user, {headers: headers});
	}

    getOfertaLaboralid(token){
		let ofertaLaboralid = JSON.parse(localStorage.getItem('ofertaLaboralid'))
		.set('Authorization', token);

		if(ofertaLaboralid != "undefined"){
			this.ofertaLaboralid = ofertaLaboralid;
		}else{
			this.ofertaLaboralid = null;
		}

		return this.ofertaLaboralid;
	}
	searchOferta(searchString):Observable<any>{
		return this._http.get(this.url+'search-oferta/'+searchString);
	}
}