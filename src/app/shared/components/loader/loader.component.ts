import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from '@core/services';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule]
})
export class LoaderComponent {
  isLoading: BehaviorSubject<boolean> = this._loadingService.loading$
  constructor(private _loadingService: LoaderService) {
  }
}
