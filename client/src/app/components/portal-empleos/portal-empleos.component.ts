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
  selector: 'app-portal-empleos',
  templateUrl: './portal-empleos.component.html',
  styleUrls: ['./portal-empleos.component.css'],
  providers: [UserService, OfertaLaboralService, UploadService]
})

export class PortalEmpleosComponent implements OnInit {

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
  public searchString: string;


  constructor(
    private _ofertaLaboralService : OfertaLaboralService,
    private _userService : UserService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _uploadService: UploadService
  ) {
    this.title = 'Ofertas laborales Mentius';
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.fecha = Date(); 
   }

  ngOnInit(): void {
    this.getOfertaLaborals();
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
  goSearch(){
    this._router.navigate(['/buscar-oferta', this.searchString]);
    }
}
