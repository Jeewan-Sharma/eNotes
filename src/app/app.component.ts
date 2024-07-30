import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { BlocksModule } from './blocks/blocks.module';
import { LoaderComponent, ToastComponent } from '@shared/components';

const Modules = [CoreModule, BlocksModule, LoaderComponent, ToastComponent];


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Modules],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'eNotes';
}
