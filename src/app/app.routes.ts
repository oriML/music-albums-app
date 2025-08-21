import { Routes } from '@angular/router';
import { authGuard } from './features/auth/auth.guard';
import { loginGuard } from './features/login/login.guard';
import { AppLayoutComponent } from './features/layout/app-layout.component';
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    canMatch: [loginGuard],
    title: 'Login'
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
            loadComponent: () => import('./features/album-details/album-details-page.component').then(m => m.AlbumDetailsPageComponent),
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
