import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ASSETS } from '@core/consts';
import { IUserDetails } from '@core/models';
import { AuthService, DeviceWidthService } from '@core/services';
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

  logout() {
    document.cookie = 'eNotes-cookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    console.log('cookie reset');
    this._router.navigate(['auth/login'])
  }
}
