import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesarrollosComponent } from './desarrollos.component';

describe('DesarrollosComponent', () => {
  let component: DesarrollosComponent;
  let fixture: ComponentFixture<DesarrollosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesarrollosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesarrollosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
