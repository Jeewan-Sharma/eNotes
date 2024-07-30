import { Component } from '@angular/core';
import { DeviceWidthService } from '@core/services';
import { ToastModule, ToastPositionType } from 'primeng/toast';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  standalone: true,
  imports: [ToastModule]
})
export class ToastComponent {
  toastPosition!: ToastPositionType;
  screenSizeSubscription!: Subscription;

  constructor(private _deviceWidthService: DeviceWidthService) { }

  ngOnInit() {
    this.screenSizeSubscription = this._deviceWidthService.screenSize$.pipe(
      map(screenSize => {
        if (screenSize === 'sm' || screenSize === 'md') {
          this.toastPosition = "top-center";
        } else {
          this.toastPosition = "bottom-center";
        }
      })
    ).subscribe();
  }

  ngOnDestroy() {
    if (this.screenSizeSubscription) {
      this.screenSizeSubscription.unsubscribe();
    }
  }

}
