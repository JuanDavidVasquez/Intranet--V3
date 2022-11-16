import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostuladoComponent } from './postulado.component';

describe('PostuladoComponent', () => {
  let component: PostuladoComponent;
  let fixture: ComponentFixture<PostuladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostuladoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostuladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
