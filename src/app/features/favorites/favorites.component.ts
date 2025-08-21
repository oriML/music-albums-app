import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Album } from '../../core/models/album.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { AlbumCardComponent } from '../../shared/components/album-card/album-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AlbumCardComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {
  private favoritesService = inject(FavoritesService);
  private router = inject(Router);

  favoriteAlbums = this.favoritesService.favorites();

  ngOnInit(): void {
    this.favoriteAlbums
  }

  toggleFavorite(album: Album): void {
    this.favoritesService.toggleFavorite(album);
    album.isFavorite = !album.isFavorite;
    this.favoriteAlbums = this.favoritesService.favorites();
  }

  viewAlbumDetails(album: Album): void {
    this.router.navigate(['/'], { queryParams: { id: album.id } });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
