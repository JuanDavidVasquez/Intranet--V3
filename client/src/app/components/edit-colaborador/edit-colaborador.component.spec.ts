import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditColaboradorComponent } from './edit-colaborador.component';

describe('EditColaboradorComponent', () => {
  let component: EditColaboradorComponent;
  let fixture: ComponentFixture<EditColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditColaboradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
