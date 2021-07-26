import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const PATTERN_EMAIL = '^[_A-Za-z0-9-\\\+]+(\\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\\.[A-Za-z0-9]+)*(\\\.[A-Za-z]{2,})$';
export class CustomValidators {

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('contrasena').value;
    const confirmPassword: string = control.get('contrasenaConfirm').value;
    if (password !== confirmPassword) {
      control.get('contrasenaConfirm').setErrors({ NoPassswordMatch: true });
    }
  }

  static emailMatchValidator(control: AbstractControl) {
    const email: string = control.get('correo').value;
    const confirmEmail: string = control.get('correoConfirm').value;
    if (email !== confirmEmail) {
      control.get('correoConfirm').setErrors({ NoEmailMatch: true });
    }
  }

  static additionalEmailMatchValidator(control: AbstractControl) {
    const email: string = control.get('correoAdicional').value;
    const confirmEmail: string = control.get('correoAdicionalConfirm').value;
    if (email !== confirmEmail) {
      control.get('correoAdicionalConfirm').setErrors({ NoEmailMatch: true });
    }
  }


  public static padLeft(valor: string, relleno: string, longitud: number) {
    let resultado: string = valor;
    let x: number = longitud - valor.length;
    let i: number = 0;

    while (i < x) {
      resultado = relleno + resultado;
      i++;
    }
    return resultado;
  }



}