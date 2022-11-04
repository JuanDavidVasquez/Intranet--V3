import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalEmpleosComponent } from './portal-empleos.component';

describe('PortalEmpleosComponent', () => {
  let component: PortalEmpleosComponent;
  let fixture: ComponentFixture<PortalEmpleosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalEmpleosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalEmpleosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
