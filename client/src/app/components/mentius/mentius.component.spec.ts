import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentiusComponent } from './mentius.component';

describe('MentiusComponent', () => {
  let component: MentiusComponent;
  let fixture: ComponentFixture<MentiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentiusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
