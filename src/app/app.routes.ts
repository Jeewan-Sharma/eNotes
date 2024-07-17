import { Routes } from '@angular/router';
import { AppLayoutComponent } from './blocks/components/app-layout/app-layout.component';
import { authGuard, preventAuthGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./feature/home/home.module').then((m) => m.HomeModule)
      },
    ]
  },
  {
    path: "auth",
    loadChildren: () => import('./feature/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [preventAuthGuard]
  }
];
