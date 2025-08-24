import { Routes } from '@angular/router';
import { authGuard } from './features/auth/auth.guard';
import { loginGuard } from './features/auth/login/login.guard';
import { AppLayoutComponent } from './features/layout/app-layout.component';
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
    canMatch: [loginGuard],
    title: 'Login'
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
    title: 'Register'
  },
  {
    path: '',
    canMatch: [authGuard],
    component: AppLayoutComponent,
    children: [
      {
        path: 'albums-panel',
        loadComponent: () => import('./features/albums-panel/albums-panel.component').then(m => m.AlbumsPanelComponent),
        title: 'Albums Panel',
        children: [
          {
            path: ':albumId',
            loadComponent: () => import('./features/album-detail/album-detail.component').then(m => m.AlbumDetailComponent),
            title: 'Album Detail'
          },
        ]
      },
      {
        path: 'favorites',
        loadComponent: () => import('./features/favorites/favorites.component').then(m => m.FavoritesComponent),
        title: 'Favorites'
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
