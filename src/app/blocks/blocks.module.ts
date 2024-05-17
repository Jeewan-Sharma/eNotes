import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BlocksRoutingModule } from './blocks-routing.module';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from '@shared/components';

import { InputSwitchModule } from 'primeng/inputswitch';
import { SidebarModule } from 'primeng/sidebar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';

const PrimeNgModules = [InputSwitchModule, SidebarModule, OverlayPanelModule, ButtonModule]

@NgModule({
  declarations: [
    AppLayoutComponent,
    HeaderComponent,
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
