import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAspiranteComponent } from './register-aspirante.component';

describe('RegisterAspiranteComponent', () => {
  let component: RegisterAspiranteComponent;
  let fixture: ComponentFixture<RegisterAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAspiranteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
