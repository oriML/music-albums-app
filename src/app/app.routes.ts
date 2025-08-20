import { Routes } from '@angular/router';
import { authGuard } from './features/auth/auth.guard';
import { loginGuard } from './features/auth/login/login.guard';
import { AppLayoutComponent } from './features/layout/app-layout.component';
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
    canMatch: [loginGuard],
  },
  {
    path: '',
    canMatch: [authGuard],
    loadComponent: () => import('./features/layout/app-layout.component').then(m => m.AppLayoutComponent),
      children: [
        {
          path: 'albums-panel',
          loadComponent: () => import('./features/albums-panel/albums-panel.component').then(m => m.AlbumsPanelComponent),
          children: [
            {
              path: ':id',
              loadComponent: () => import('./features/albums-panel/components/album-detail/album-detail.component').then(m => m.AlbumDetailComponent),
            },
          ]
        },
        {
          path: 'favorites',
          loadComponent: () => import('./features/favorites/favorites.component').then(m => m.FavoritesComponent)
        },
        {
          path: '',
          redirectTo: 'albums-panel',
          pathMatch: 'full',
        }
      ],
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];