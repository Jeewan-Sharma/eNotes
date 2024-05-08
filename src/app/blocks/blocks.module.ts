import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocksRoutingModule } from './blocks-routing.module';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';

import { InputSwitchModule } from 'primeng/inputswitch';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarComponent } from '@shared/components';

const PrimeNgModules = [InputSwitchModule, SidebarModule]

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
