import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarOfertaComponent } from './buscar-oferta.component';

describe('BuscarOfertaComponent', () => {
  let component: BuscarOfertaComponent;
  let fixture: ComponentFixture<BuscarOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarOfertaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
