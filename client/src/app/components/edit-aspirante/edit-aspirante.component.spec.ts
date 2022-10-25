import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAspiranteComponent } from './edit-aspirante.component';

describe('EditAspiranteComponent', () => {
  let component: EditAspiranteComponent;
  let fixture: ComponentFixture<EditAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAspiranteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
