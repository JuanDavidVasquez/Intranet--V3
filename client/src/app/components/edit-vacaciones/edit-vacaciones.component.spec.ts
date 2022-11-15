import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVacacionesComponent } from './edit-vacaciones.component';

describe('EditVacacionesComponent', () => {
  let component: EditVacacionesComponent;
  let fixture: ComponentFixture<EditVacacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVacacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVacacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
