import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAcademicoEditComponent } from './perfil-academico-edit.component';

describe('PerfilAcademicoEditComponent', () => {
  let component: PerfilAcademicoEditComponent;
  let fixture: ComponentFixture<PerfilAcademicoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilAcademicoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilAcademicoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
