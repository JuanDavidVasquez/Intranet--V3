import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PerfilAcademico } from 'src/app/models/perfilAcademico';
import { PerfilAcademicoService } from 'src/app/service/perfilAcademico.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
declare var $:any;

@Component({
  selector: 'app-perfil-academico',
  templateUrl: './perfil-academico.component.html',
  styleUrls: ['./perfil-academico.component.css']
})
export class PerfilAcademicoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
