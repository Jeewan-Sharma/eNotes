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
  userDetails$: Observable<IUserDetails | null>;

  constructor(
    protected _deviceWidthService: DeviceWidthService,
    private _authService: AuthService,
    private _router: Router,
  ) {
    this.userDetails$ = this._authService.userDetails$;
  }

  ngOnInit(): void {
    console.log(this.userDetails$)
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
