import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilGeneralidadesComponent } from './perfil-generalidades.component';

describe('PerfilGeneralidadesComponent', () => {
  let component: PerfilGeneralidadesComponent;
  let fixture: ComponentFixture<PerfilGeneralidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilGeneralidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilGeneralidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
