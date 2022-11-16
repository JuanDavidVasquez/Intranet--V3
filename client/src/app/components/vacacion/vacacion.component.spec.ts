import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacacionComponent } from './vacacion.component';

describe('VacacionComponent', () => {
  let component: VacacionComponent;
  let fixture: ComponentFixture<VacacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
