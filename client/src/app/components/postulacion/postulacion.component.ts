import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { UploadService } from 'src/app/service/upload.service';
import { OfertaLaboral } from 'src/app/models/ofertaLaboral';
import { OfertaLaboralService } from 'src/app/service/ofertaLaboral.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styleUrls: ['./postulacion.component.css'],
  providers: [UserService, OfertaLaboralService, UploadService],
})
export class PostulacionComponent implements OnInit {
  public title: string;
  public token;
  public identity;
  public ofertaLaboral: OfertaLaboral;
  public status: string;
  public url: string;
  public pOfertaLaboral;

  constructor(
    private _ofertaLaboralService: OfertaLaboralService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _uploadService: UploadService
  ) {
    this.title = 'Ofertas laborales Mentius';
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this.getOfertaLaboral(id, this.token);
    });
  }
  getOfertaLaboral(id, token) {
    this._ofertaLaboralService.getOfertaLaboral(id, token).subscribe(
      (response) => {
        this.ofertaLaboral = response.ofertaLaboral;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
