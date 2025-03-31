import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgendarComponent } from './modal-agendar.component';

describe('ModalAgendarComponent', () => {
  let component: ModalAgendarComponent;
  let fixture: ComponentFixture<ModalAgendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAgendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAgendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
