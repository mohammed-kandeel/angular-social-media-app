import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertModalComponentComponent } from './alert-modal-component.component';

describe('AlertModalComponentComponent', () => {
  let component: AlertModalComponentComponent;
  let fixture: ComponentFixture<AlertModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertModalComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
