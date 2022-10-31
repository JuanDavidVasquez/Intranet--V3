import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaLaboralEditComponent } from './oferta-laboral-edit.component';

describe('OfertaLaboralEditComponent', () => {
  let component: OfertaLaboralEditComponent;
  let fixture: ComponentFixture<OfertaLaboralEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertaLaboralEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfertaLaboralEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
