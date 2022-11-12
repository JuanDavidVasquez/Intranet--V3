import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OfertaLaboral } from 'src/app/models/ofertaLaboral';
import { OfertaLaboralService } from 'src/app/service/ofertaLaboral.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
declare var $: any;


@Component({
  selector: 'app-oferta-laboral',
  templateUrl: './oferta-laboral.component.html',
  styleUrls: ['./oferta-laboral.component.css'],
  providers: [OfertaLaboralService, UserService]
})
export class OfertaLaboralComponent implements OnInit {

  public title: string;
  public ofertaLaboral: OfertaLaboral;
  public user: User;
  public identity;
  public token;
  public status: string;
  public url: string;
  public ofertaLaborals: OfertaLaboral[];
  public users: User[];
  public ofertaLaboralId;
  public fecha:any;
  public fechaEstimada:any;
  public dias:Number;

  @Input() name: string;
  serverElements: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ofertaLaboralService: OfertaLaboralService,
    private _userService: UserService,
  ) {
    this.title = 'Registro de oferta';
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.ofertaLaboralId = this.identity._id;
    this.fecha = Date(); 
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.ofertaLaboral = new OfertaLaboral("", "", "", "", "", "", "",Date(),"","");
    this.url = GLOBAL.url;
    console.log(this.identity);
    this.fechas();
  }
  fechas(){
    var fechaEstimada = new Date(this.fecha);
    var dias = 15; // Número de días a agregar
    fechaEstimada.setDate(fechaEstimada.getDate() + dias);
    console.log(fechaEstimada);
    return fechaEstimada;
  }

  onSubmit(form: any) {
    console.log(this.ofertaLaboral);
    this._ofertaLaboralService.saveOfertaLaboral(this.ofertaLaboral, this.token).subscribe(
      response => {
        if (!response.ofertaLaboral) {
          this.status = 'error';
        } else {
          this.status = 'success';
          form.reset();
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
}