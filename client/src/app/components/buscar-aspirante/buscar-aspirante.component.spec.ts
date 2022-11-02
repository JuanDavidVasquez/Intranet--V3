import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAspiranteComponent } from './buscar-aspirante.component';

describe('BuscarAspiranteComponent', () => {
  let component: BuscarAspiranteComponent;
  let fixture: ComponentFixture<BuscarAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarAspiranteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
