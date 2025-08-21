import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, AsyncPipe, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AlbumDetailService } from '../../core/http/album-detail.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { Album } from '../../core/models/album.model';
import { tap } from 'rxjs';
import { AlbumDetailComponent } from './components/album-details/album-details.component';

@Component({
  selector: 'app-album-details-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    AlbumDetailComponent,
  ],
  templateUrl: './album-details-page.component.html',
  styleUrls: ['./album-details-page.component.scss'],
})
export class AlbumDetailsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private albumDetailService = inject(AlbumDetailService);
  private favoritesService = inject(FavoritesService);

  error = computed(() => this.albumDetailService.error());
  loading = computed(() => this.albumDetailService.loading());
  album = computed(() => {
    const album = this.albumDetailService.album()
    if (album) {
      album.isFavorite = this.favoritesService.isFavorite(album.id);
    }
    return album;
  });

  ngOnInit(): void {
    this.route.paramMap.pipe(
      tap(params => {
        const id = params.get('albumId') ?? '';
        this.albumDetailService.loadAlbum(id);
      })
    ).subscribe();
  }

  toggleFavorite(album: Album): void {
    this.favoritesService.toggleFavorite(album);
  }

  goBack(): void {
    this.location.back();
  }
}
