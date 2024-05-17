import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ASSETS } from '@core/consts';
import { IMessage } from '@core/models';
import { DeviceWidthService } from '@core/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  readonly ASSETS = ASSETS;

  registerForm!: FormGroup;
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;
  isRegistrationSuccess: boolean = false;
  showResponse: boolean = false;
  message!: IMessage;

  formInvalidMessage: IMessage = {
    image: ASSETS.IMAGES.ERROR,
    title: 'Form Invalid!',
    description: 'Please check all the required fields of the form',
  };

  registrationFailedMessage: IMessage = {
    image: ASSETS.IMAGES.ERROR,
    title: 'Registration Failed!',
    description: 'The Email you have entered is already in use.',
  };

  registrationSuccessMessage: IMessage = {
    image: ASSETS.IMAGES.SUCCESS,
    title: 'Congratulations!',
    description: 'Registration successful you can Login now.',
  };

  constructor(
    private _router: Router,
    private _deviceWidthService: DeviceWidthService,
  ) { }

  async ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl<string | null>(null, [Validators.required]),
        lastName: new FormControl<string | null>(null, [Validators.required]),
        email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
        phone: new FormControl<string | null>(null, [
          Validators.required
        ]),
        password: new FormControl<string | null>(null, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ]),
        confirmPassword: new FormControl<string | null>(null, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          this.passwordMatchValidator(),
        ]),
      }
    );
  }

  get screenSize$() {
    return this._deviceWidthService.screenSize$;
  }

  // custom validator for password check
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.parent?.get('password')?.value;
      const confirmPassword = control.parent?.get('confirmPassword')?.value;
      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  // give error for validation
  getErrorMessage(controlName: string) {
    const control = this.registerForm.get(controlName);
    // Error message for required feilds
    if (control?.hasError('required')) {
      if (controlName == 'password') return 'Password is required';
      if (controlName == 'confirmPassword')
        return 'Password Confirmation is required';
    }

    // Error message for length
    if (control?.hasError('minlength' || 'maxlength')) {
      if (controlName == 'password' || 'confirmPassword')
        return 'Password should contain 6 to 20 letters';
    }

    // custom validator - password Match
    if (control?.hasError('passwordMismatch')) {
      return 'Passwords should match';
    }
    return '';
  }

  // route to login
  routeToLogin() {
    this._router.navigate(['auth/login']);
  }

  async submit() {
    // try {
    //   if (this.registerForm.invalid) {
    //     this.registerForm.markAllAsTouched();
    //     this.message = this.formInvalidMessage;
    //     this.openDialog();
    //     return;
    //   }
    //   this._loaderService.showLoader()
    //   const credentialState: IRegisterCredentials = {
    //     firstName: this.capitalizeFirstLetter(this.registerForm.controls['firstName'].value),
    //     lastName: this.capitalizeFirstLetter(this.registerForm.controls['lastName'].value),
    //     email: this.registerForm.controls['email'].value,
    //     phone: this.registerForm.controls['phone'].value,
    //     password: this.registerForm.controls['password'].value,
    //   };
    //   const res = await this._authService.register(credentialState)
    //   if (res) {
    //     this.isRegistrationSuccess = true
    //     this.message = this.registrationSuccessMessage
    //   } else {
    //     this.isRegistrationSuccess = false
    //     this.message = this.registrationFailedMessage
    //   }
    //   this.openDialog()
    // } catch (e) {
    //   throw e
    // } finally {
    //   this._loaderService.hideLoader()
    // }
  }

  closeDialog() {
    this.showResponse = false
  }

  openDialog() {
    this.showResponse = true;
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
