import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterModule,
    MatListModule,
    MatSidenavModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  private _authService = inject(AuthService);
  
  public menuItems = [
    { name: 'Albums Panel', path: 'albums-panel' },
    { name: 'Favorites', path: 'favorites' }
  ];


  logout(): void {
    this._authService.logout();
  }
}
