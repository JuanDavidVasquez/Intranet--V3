import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiezaGraficaOfertaComponent } from './pieza-grafica-oferta.component';

describe('PiezaGraficaOfertaComponent', () => {
  let component: PiezaGraficaOfertaComponent;
  let fixture: ComponentFixture<PiezaGraficaOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiezaGraficaOfertaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiezaGraficaOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
