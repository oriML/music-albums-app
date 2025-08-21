import { Injectable, signal, computed, inject } from '@angular/core';
import { Album } from '../models/album.model';
import { SpotifyService } from './spotify.service';
import { mapSpotifyAlbumToAlbum } from '../mappers/spotify-mapper';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlbumDetailService {
  private spotifyService = inject(SpotifyService);

  private _album = signal<Album | null>(null);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  public album = computed(() => this._album());
  public loading = computed(() => this._loading());
  public error = computed(() => this._error());

  async loadAlbum(id: string) {
    if (!id) return;

    this.clearAlbum();
    this._loading.set(true);

    try {
      const spotifyResponse = await firstValueFrom(this.spotifyService.getAlbumDetails(id));
      const mappedAlbum = mapSpotifyAlbumToAlbum(spotifyResponse);
      this._album.set(mappedAlbum);
    } catch (err) {
      console.error(err);
      this._error.set('Failed to load album details');
    } finally {
      this._loading.set(false);
    }
  }

  clearAlbum() {
    this._album.set(null);
    this._loading.set(false);
    this._error.set(null);
  }
}

