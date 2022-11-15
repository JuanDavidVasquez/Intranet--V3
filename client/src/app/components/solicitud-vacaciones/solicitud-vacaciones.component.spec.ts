import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudVacacionesComponent } from './solicitud-vacaciones.component';

describe('SolicitudVacacionesComponent', () => {
  let component: SolicitudVacacionesComponent;
  let fixture: ComponentFixture<SolicitudVacacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudVacacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudVacacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
