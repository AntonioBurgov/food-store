import { AbstractControl, FormGroup } from "@angular/forms";

export const PasswordsMatchValidator = (
  passwordControlName: string,
  confirmPasswordControlName: string
) => {
  const validator = (form: FormGroup) => {
    // Change AbstractControl to FormGroup
    const passwordControl = form.get(passwordControlName);
    const confirmPasswordControl = form.get(confirmPasswordControlName);

    if (!passwordControl || !confirmPasswordControl) return;

    const passwordValue = passwordControl.value;
    const confirmPasswordValue = confirmPasswordControl.value;

    if (passwordValue !== confirmPasswordValue) {
      confirmPasswordControl.setErrors({ notMatch: true });
    } else {
      // Reset the 'notMatch' error if passwords match
      const errors = confirmPasswordControl.errors;
      if (errors && errors.notMatch) {
        delete errors.notMatch;
        confirmPasswordControl.setErrors(
          Object.keys(errors).length ? errors : null
        );
      }
    }
  };
  return validator;
};
