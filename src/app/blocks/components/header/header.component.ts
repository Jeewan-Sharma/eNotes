import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ASSETS } from '@core/consts';
import { IUserDetails } from '@core/models';
import { AuthService, DeviceWidthService, LoaderService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  readonly ASSETS = ASSETS
  checked: boolean = false;
  menuVisibility: boolean = false;
  userDetails: IUserDetails | null = this._authService.userDetails;

  constructor(
    protected _deviceWidthService: DeviceWidthService,
    private _authService: AuthService,
    private _loaderService: LoaderService,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  async getUserInfo() {
    // this.userDetails = await this._authService.getUser();
  }

  openSideBar() {
    this.menuVisibility = true;
  }

  closeSideBar() {
    this.menuVisibility = false;
  }

  routeToLogin() { }

  async logout() {
    this._loaderService.showLoader();
    await this._authService.logout();
    this._router.navigate(['auth/login']);
    this._loaderService.hideLoader();
  }
}
