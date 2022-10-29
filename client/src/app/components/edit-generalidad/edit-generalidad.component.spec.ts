import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGeneralidadComponent } from './edit-generalidad.component';

describe('EditGeneralidadComponent', () => {
  let component: EditGeneralidadComponent;
  let fixture: ComponentFixture<EditGeneralidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGeneralidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGeneralidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
