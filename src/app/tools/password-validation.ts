import { AbstractControl } from '@angular/forms';

export class PasswordValidation
{
    static MatchPassword(ctrl: AbstractControl)
    {
        let password = ctrl.get('password').value;
        let confirmPassword = ctrl.get('confirmPassword').value;
        if (confirmPassword && password !== confirmPassword) {
            ctrl.get('confirmPassword').setErrors({ MatchPassword: true })
        } else {
            return null
        }
    }
}
