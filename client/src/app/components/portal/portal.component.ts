import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { UploadService } from 'src/app/service/upload.service';
import { OfertaLaboral } from 'src/app/models/ofertaLaboral';
import { OfertaLaboralService } from 'src/app/service/ofertaLaboral.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css'],
  providers: [UserService, OfertaLaboralService, UploadService]
})
export class PortalComponent implements OnInit {

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
    private router:Router,
    private _ofertaLaboralService : OfertaLaboralService,
    private _userService : UserService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _uploadService: UploadService) 
    {
    this.title = 'Ofertas laborales solicitadas';
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.fecha = Date(); 
    }

  ngOnInit(): void {
  }
  searchs() {
    $("#effect").animate({
      color: "#fff",
      width: 700
    }, 1000);
    $("input").animate({
      display: "block",
      height: "50px",
      backgroundColor:"transparent",
      width:500,
    }, 1000);
    $('input', this).focus();
  }
  portal(){
  
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