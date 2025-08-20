import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
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

  favoriteAlbums = signal<Album[]>(this.favoritesService.favorites());

  ngOnInit(): void {
  }

  toggleFavorite(album: Album): void {
    this.favoritesService.toggleFavorite(album);
  }

  viewAlbumDetails(album: Album): void {
    this.router.navigate(['/album'], { queryParams: { id: album.collectionId } });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
