import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BlocksRoutingModule } from './blocks-routing.module';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SidebarComponent } from '@shared/components';

import { InputSwitchModule } from 'primeng/inputswitch';
import { SidebarModule } from 'primeng/sidebar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ToastModule } from 'primeng/toast'
import { ToastComponent } from './components/toast/toast.component';

const PrimeNgModules = [
  InputSwitchModule,
  SidebarModule,
  OverlayPanelModule,
  ButtonModule,
  ProgressSpinnerModule,
  ToastModule,
]

@NgModule({
  declarations: [
    AppLayoutComponent,
    HeaderComponent,
    LoaderComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    BlocksRoutingModule,
    PrimeNgModules,
    FormsModule,
    SidebarComponent
  ]
})
export class BlocksModule { }
