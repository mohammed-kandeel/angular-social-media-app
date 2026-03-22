import { IFieldError } from '../../../../../shared/interfaces/ifield-error.interface';

export interface IArrOfErrorsRegister {
  name: IFieldError[];
  email: IFieldError[];
  gender: IFieldError[];
  dateOfBirth: IFieldError[];
  password: IFieldError[];
  rePassword: IFieldError[];
}
