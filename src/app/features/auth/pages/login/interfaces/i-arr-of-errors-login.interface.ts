import { IFieldError } from '../../../../../shared/interfaces/ifield-error.interface';

export interface IArrOfErrorsLogin {
  login: IFieldError[];
  password: IFieldError[];
}
