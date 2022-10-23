import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclutamientoComponent } from './reclutamiento.component';

describe('ReclutamientoComponent', () => {
  let component: ReclutamientoComponent;
  let fixture: ComponentFixture<ReclutamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclutamientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclutamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
