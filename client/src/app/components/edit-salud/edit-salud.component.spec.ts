import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSaludComponent } from './edit-salud.component';

describe('EditSaludComponent', () => {
  let component: EditSaludComponent;
  let fixture: ComponentFixture<EditSaludComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSaludComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
