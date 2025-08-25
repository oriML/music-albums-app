import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, input, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { Album } from '../../../../core/models/album.model';
import { FavoritesService } from '../../../../core/services/favorites.service';
import { AlbumDetailService } from '../../../../core/http/album-detail.service';

@Component({
  selector: 'app-album-details',
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
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
})
export class AlbumDetailComponent implements OnInit {

  private albumDetailService = inject(AlbumDetailService);
  private favoritesService = inject(FavoritesService);
  
  album = input.required<Album>();
  toggleFavoriteEvent = output<Album>();
  goBackEvent = output<void>();

  get error() {
    return this.albumDetailService.error();
  }

  get isLoading() {
    return this.albumDetailService.loading();
  }

  isFavorite() {
    return this.favoritesService.isFavorite(this.album()?.id || '')
  };

  ngOnInit(): void {

  }

  goBack(): void {
    this.goBackEvent.emit();
  }

  toggleFavorite(): void {
    this.toggleFavoriteEvent.emit(this.album());
    this.album().isFavorite = !this.album().isFavorite;
  }

  formatDuration(ms: number): string {
    if (!ms) return '0:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
}
