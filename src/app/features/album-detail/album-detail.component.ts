import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { Observable, switchMap, tap, catchError, of } from 'rxjs';

import { AlbumDetailService } from '../../core/http/album-detail.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { Album } from '../../core/models/album.model';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatListModule
  ],
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private albumDetailService = inject(AlbumDetailService);
  public favoritesService = inject(FavoritesService);

  get error() {
    return this.albumDetailService.error();
  }

  get isLoading() {
    return this.albumDetailService.loading();
  }

  get album() {
    return this.albumDetailService.album();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      tap(params => {
        const id = params.get('albumId') ?? ''; // Use albumId from route
        this.albumDetailService.loadAlbum(id);
      })
    ).subscribe();
  }

  toggleFavorite(album: Album): void {
    this.favoritesService.toggleFavorite(album);
  }

  goBack(): void {
    this.router.navigate(['/albums-panel']);
  }

  formatDuration(ms: number): string {
    if (!ms) return '0:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
}
