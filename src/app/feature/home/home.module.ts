import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeRootComponent } from './components/home-root/home-root.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from '@shared/components';

import { MenuModule } from 'primeng/menu';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';

const PrimeNgModules = [
  MenuModule,
  InputGroupModule,
  ButtonModule,
  InputTextModule,
  DividerModule,
  EditorModule,
  DialogModule,
  SidebarModule,
  TooltipModule,
]

@NgModule({
  declarations: [
    HomeRootComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModules,
    SidebarComponent,
  ]
})
export class HomeModule { }
