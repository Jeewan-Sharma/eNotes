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

  constructor(protected _deviceWidthService: DeviceWidthService) { }

  openSideBar() {
    this.menuVisibility = true;
  }

  closeSideBar() {
    this.menuVisibility = false;
  }
}
