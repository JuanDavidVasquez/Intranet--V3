import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Aspirante } from 'src/app/models/aspirante';
import { UserService } from 'src/app/service/user.service';
import { AspiranteService } from 'src/app/service/aspirante.service';
import { GLOBAL } from 'src/app/service/global';
import Chart from 'chart.js/auto';
declare var $:any;

@Component({
  selector: 'app-reclutamiento',
  templateUrl: './reclutamiento.component.html',
  styleUrls: ['./reclutamiento.component.css'],
  providers: [UserService, AspiranteService]
})
export class ReclutamientoComponent implements OnInit {

	public title;
	public identity;
	public token;
	public status:string;
	public url: string;
	public aspirantes: Aspirante[];
	public users: User[];
	public user: User;
	public searchString: string;
	public chart: any;


  constructor(
	private _route:ActivatedRoute,
    private _router:Router,
    private _aspiranteService:AspiranteService,
    private _userService:UserService
  ) { 
   	    this.title = 'Reclutamiento';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
  }

  ngOnInit(): void {
	$('body').css('background','url(../../../assets/img/rrhh/fondorrhh.jpg)')
				.css('background-repeat','no-repeat');

	this.getAspirantes(this.token);
	this.createChart();
}
  getAspirantes(token){
		this._aspiranteService.getAspirantes(token).subscribe(
			response => {
				if(!response.aspirantes){
					this.status = 'error';
				}else{
					this.aspirantes = response.aspirantes;
					this.token = response.token;
				}
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);

				if(errorMessage != null){
					this.status = 'error';
				}
			}
		);
	}
	goSearch(){
		this._router.navigate(['/buscar-aspirante', this.searchString]);
	  }

	  createChart(){
  
		this.chart = new Chart("MyChart", {
		  type: 'bar', //this denotes tha type of chart
	
		  data: {// values on X-Axis
			labels: ['Psicologa', '2022-05-11', '2022-05-12','2022-05-13',
									 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
			   datasets: [
			  {
				label: "Laura",
				data: ['576','576', '572', '79', '92',
									 '574', '573', '576'],
				backgroundColor: 'blue'
			  },
			  {
				label: "Chacon",
				data: ['542', '542', '536', '327', '17',
										 '0.00', '538', '541'],
				backgroundColor: 'limegreen'
			  }  
			]
		  },
		  options: {
			aspectRatio:2.5
		  }
		  
		});
	  }
}
