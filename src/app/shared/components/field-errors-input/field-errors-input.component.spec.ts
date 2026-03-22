import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorsInputComponent } from './field-errors-input.component';

describe('FieldErrorsInputComponent', () => {
  let component: FieldErrorsInputComponent;
  let fixture: ComponentFixture<FieldErrorsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldErrorsInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldErrorsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
