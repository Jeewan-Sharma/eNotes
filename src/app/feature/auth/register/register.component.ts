import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ASSETS } from '@core/consts';
import { IMessage, IRegisterCredentials } from '@core/models';
import { AuthService, DeviceWidthService } from '@core/services';

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
  isLoading: boolean = false;
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
    private _authService: AuthService,
  ) { }

  async ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.registerForm = new FormGroup(
      {
        userName: new FormControl<string | null>(null, [Validators.required]),
        email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
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

  // route to login
  routeToLogin() {
    this._router.navigate(['auth/login']);
  }

  async submit() {
    try {
      if (this.registerForm.invalid) {
        this.registerForm.markAllAsTouched();
        this.message = this.formInvalidMessage;
        this.openDialog();
        return;
      }
      this.isLoading = true;
      const registerCredentialState: IRegisterCredentials = {
        email: this.registerForm.controls['email'].value,
        username: this.capitalizeFirstLetter(this.registerForm.controls['userName'].value),
        password: this.registerForm.controls['password'].value,
      };

      const res = await this._authService.register(registerCredentialState)
      if (res) {
        this.isRegistrationSuccess = true
        this.message = this.registrationSuccessMessage
      }
    } catch (e) {
      this.isRegistrationSuccess = false
      this.message = this.registrationFailedMessage
      throw e
    } finally {
      this.openDialog();
      this.isLoading = false;
    }
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
