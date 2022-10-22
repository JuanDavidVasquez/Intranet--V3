import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarImagenDeNoticiaComponent } from './cargar-imagen-de-noticia.component';

describe('CargarImagenDeNoticiaComponent', () => {
  let component: CargarImagenDeNoticiaComponent;
  let fixture: ComponentFixture<CargarImagenDeNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarImagenDeNoticiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarImagenDeNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
