import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() nombre!: string;
  @Input() size!: string;
  @Input() background!: string;

  public title:string;

  constructor() { 
    this.title = 'Mentius';
  }

  ngOnInit(): void {
  }

}
