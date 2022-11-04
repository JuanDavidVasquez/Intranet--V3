import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { UploadService } from 'src/app/service/upload.service';
import { OfertaLaboral } from 'src/app/models/ofertaLaboral';
import { OfertaLaboralService } from 'src/app/service/ofertaLaboral.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
declare var $:any;

@Component({
  selector: 'app-ofertas-laborales',
  templateUrl: './ofertas-laborales.component.html',
  styleUrls: ['./ofertas-laborales.component.css'],
  providers: [UserService, OfertaLaboralService, UploadService]
})
export class OfertasLaboralesComponent implements OnInit {

  public title:string;
  public token;
  public identity;
  public ofertaLaborals: OfertaLaboral[];
	public status: string;
	public url: string;
	public pOfertaLaboral;
  public fecha:any;
  public fechaEstimada:any;
  public dias:Number;


  constructor(
    private _ofertaLaboralService : OfertaLaboralService,
    private _userService : UserService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _uploadService: UploadService
  ) {
    this.title = 'Ofertas laborales solicitadas';
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.fecha = Date(); 
   }

  ngOnInit(): void {
    this.getOfertaLaborals();
    $('body').css('background','url(../../../assets/img/perfiles/fondoAcademico.jpg)')
    .css('background-repeat','no-repeat');
    this.fechas();
  }
  fechas(){
    var fechaEstimada = new Date(this.fecha);
    var dias = 15; // Número de días a agregar
    fechaEstimada.setDate(fechaEstimada.getDate() + dias);
    console.log(fechaEstimada);
    return fechaEstimada;
  }
  getOfertaLaborals(){
    this._ofertaLaboralService.getOfertaLaborals().subscribe(
      response=>{
        if(!response.ofertaLaborals){
          this.status = 'error';
        }else{
          this.ofertaLaborals = response.ofertaLaborals;
        }
      },
      error =>{
        var errorMessage = <any>error;
        if(errorMessage != null){
          this.status = 'erroor';
        }

      }
    );

  }
}
