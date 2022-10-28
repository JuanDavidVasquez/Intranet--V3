import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAcademicoComponent } from './perfil-academico.component';

describe('PerfilAcademicoComponent', () => {
  let component: PerfilAcademicoComponent;
  let fixture: ComponentFixture<PerfilAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilAcademicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
