import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoLaboralComponent } from './certificado-laboral.component';

describe('CertificadoLaboralComponent', () => {
  let component: CertificadoLaboralComponent;
  let fixture: ComponentFixture<CertificadoLaboralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadoLaboralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificadoLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
