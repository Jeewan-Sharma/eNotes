import { Component } from '@angular/core';
import { ASSETS } from '@core/consts';
import { DeviceWidthService } from '@core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly ASSETS = ASSETS

  checked: boolean = false;

  menuVisibility: boolean = false;

  loginCredential = {
    loginStatus: false,
    firstName: "Jeewan",
    lastName: "Sharma",
    email: "sjeewan53@gmail.com"
  }

  constructor(protected _deviceWidthService: DeviceWidthService) { }

  openSideBar() {
    this.menuVisibility = true;
  }

  closeSideBar() {
    this.menuVisibility = false;
  }

  routeToLogin() { }

  logout() {

  }
}
