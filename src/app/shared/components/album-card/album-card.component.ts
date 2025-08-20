import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Album } from '../../../core/models/album.model';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumCardComponent {
  album = input.required<Album>();
  toggleFavoriteEvent = output<Album>();
  viewDetails = output<Album>();

  onToggleFavorite(): void {
    this.toggleFavoriteEvent.emit(this.album());
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.album());
  }
}
