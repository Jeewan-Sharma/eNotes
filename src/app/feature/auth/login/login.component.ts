import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ASSETS } from '@core/consts';
import { ILoginCredentials, IMessage } from '@core/models';
import { AuthService, DeviceWidthService, LoaderService } from '@core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  readonly ASSETS = ASSETS;
  loginForm!: FormGroup;
  isLoading: boolean = false;
  isPasswordVisible: boolean = false;
  isCredentialFalse: boolean = false;
  showErrorResponse: boolean = false;
  message!: IMessage;

  formInvalidMessage: IMessage = {
    image: ASSETS.IMAGES.ERROR,
    title: 'Invalid Credentials!',
    description: 'Please check all the required fields of the form',
  };

  loginFailedMessage: IMessage = {
    image: ASSETS.IMAGES.ERROR,
    title: 'Login Failed!',
    description: 'Please check the credentials and try again.',
  };

  constructor(
    private _deviceWidthService: DeviceWidthService,
    protected _loaderService: LoaderService,
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      password: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      rememberMe: new FormControl<boolean | null>(true),
    });
  }

  get screenSize$() {
    return this._deviceWidthService.screenSize$;
  }

  async submit() {
    try {
      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        this.message = this.formInvalidMessage
        this.openDialog()
        return;
      }

      this.isLoading = true;
      const loginCredentialState: ILoginCredentials = {
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value,
      };

      const res = await this._authService.login(loginCredentialState)
      if (res) {
        // !todo: remember me setting
        // const rememberMe = this.loginForm.controls['rememberMe'].value;
        // if (rememberMe) {
        //   this._localHostDataService.setLoginStatusAndCredentials(rememberMe, res.firstName, res.lastName, credentialState.email, res.phone, credentialState.password, true)
        // } else {
        //   this._localHostDataService.setLoginStatusAndCredentials(rememberMe, null, null, null, null, null, true)
        // }
        this._router.navigate(['/'])
      }
    } catch (e) {
      this.message = this.loginFailedMessage;
      this.openDialog();
    } finally {
      this.isLoading = false;
    }

  }

  navigateToRegister() {
    this._router.navigate(['auth/register']);
  }

  openDialog() {
    this.showErrorResponse = true
  }

  closeDialog() {
    this.showErrorResponse = false;
  }

  navigateToHome() {
    this._router.navigate(['/'])
  }
}
