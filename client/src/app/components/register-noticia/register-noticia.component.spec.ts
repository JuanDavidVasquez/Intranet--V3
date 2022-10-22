import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNoticiaComponent } from './register-noticia.component';

describe('RegisterNoticiaComponent', () => {
  let component: RegisterNoticiaComponent;
  let fixture: ComponentFixture<RegisterNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNoticiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
