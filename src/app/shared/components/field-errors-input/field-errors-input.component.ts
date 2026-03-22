import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IFieldError } from '../../interfaces/ifield-error.interface';

@Component({
  selector: 'field-errors-input',
  imports: [],
  templateUrl: './field-errors-input.component.html',
  styleUrl: './field-errors-input.component.css',
})
export class FieldErrorsInputComponent {
  @Input({ required: true }) control!: AbstractControl | null;
  @Input({ required: true }) arrOfErrors!: IFieldError[];
}
