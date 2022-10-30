import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMentiusComponent } from './perfil-mentius.component';

describe('PerfilMentiusComponent', () => {
  let component: PerfilMentiusComponent;
  let fixture: ComponentFixture<PerfilMentiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilMentiusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilMentiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
