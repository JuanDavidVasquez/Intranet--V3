import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilGeneralComponent } from './perfil-general.component';

describe('PerfilGeneralComponent', () => {
  let component: PerfilGeneralComponent;
  let fixture: ComponentFixture<PerfilGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
