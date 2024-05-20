import { Routes } from '@angular/router';
import { AppLayoutComponent } from './blocks/components/app-layout/app-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./feature/home/home.module').then((m) => m.HomeModule)
      },
    ]
  },
  {
    path: "auth",
    loadChildren: () => import('./feature/auth/auth.module').then((m) => m.AuthModule)
  }
];
