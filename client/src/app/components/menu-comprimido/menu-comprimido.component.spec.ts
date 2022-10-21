import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComprimidoComponent } from './menu-comprimido.component';

describe('MenuComprimidoComponent', () => {
  let component: MenuComprimidoComponent;
  let fixture: ComponentFixture<MenuComprimidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComprimidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComprimidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
