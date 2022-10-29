import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Salud } from 'src/app/models/salud';


@Component({
  selector: 'app-perfil-salud',
  templateUrl: './perfil-salud.component.html',
  styleUrls: ['./perfil-salud.component.css']
})
export class PerfilSaludComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
