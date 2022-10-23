import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhComponent } from './rrhh.component';

describe('RrhhComponent', () => {
  let component: RrhhComponent;
  let fixture: ComponentFixture<RrhhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrhhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RrhhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
