import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../shared/services/auth.service';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  private _authService = inject(AuthService);
  private _themeService = inject(ThemeService);

  public menuItems = [
    { name: 'Albums Panel', path: 'albums-panel', icon: 'album' },
    { name: 'Favorites', path: 'favorites', icon: 'favorite' }
  ];


  logout(): void {
    this._authService.logout();
  }

  toggleTheme(): void {
    this._themeService.toggleTheme();
  }
  
  isDarkTheme(): boolean {
    return this._themeService.currentTheme() === 'dark';
  }
}
