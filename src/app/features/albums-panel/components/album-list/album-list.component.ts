import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Album } from '../../../../core/models/album.model';
import { AlbumCardComponent } from '../../../../shared/components/album-card/album-card.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [
    CommonModule,
    AlbumCardComponent,
    MatIcon,
    MatProgressSpinner,
  ],
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
})
export class AlbumListPage {
  private router = inject(Router);

  albums = input<Album[] | null>();
  loading = input<boolean>(false);
  error = input<string | null>(null);

  toggleFavoriteEvent = output<Album>();

  toggleFavorite(album: Album): void {
    this.toggleFavoriteEvent.emit(album);
    album.isFavorite = !album.isFavorite;
  }

  viewAlbumDetails(album: Album): void {
    this.router.navigate([this.router.url], { queryParams: { albumId: album.id } });
  }
}
