import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthRootComponent } from './auth-root/auth-root.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';

const PrimeNgModules = [
  CheckboxModule,
  DialogModule,
  SidebarModule,
  ButtonModule,
  InputTextModule,
  InputMaskModule
]

@NgModule({
  declarations: [
    AuthRootComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    PrimeNgModules,
  ]
})
export class AuthModule { }
