import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilSaludComponent } from './perfil-salud.component';

describe('PerfilSaludComponent', () => {
  let component: PerfilSaludComponent;
  let fixture: ComponentFixture<PerfilSaludComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilSaludComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilSaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
