import { Component } from '@angular/core';
import { LoaderService } from '@core/services';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  isLoading: BehaviorSubject<boolean> = this._loadingService.loading$
  constructor(private _loadingService: LoaderService) {
  }
}
