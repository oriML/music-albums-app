import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Album } from '../../../core/models/album.model';
import { SpotifyService } from '../../../core/http/spotify.service';
import { mapSpotifySearchResponseToAlbums } from '../../../core/mappers/spotify-mapper';

export type FilterType = 'album' | 'artist';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  private spotifyService = inject(SpotifyService);

  private readonly _querySignal = signal<string>('');
  private readonly _filterSignal = signal<FilterType>('album');
  private readonly _albumsSignal = signal<Album[]>([]);
  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<string | null>(null);
  private readonly _pageSignal = signal<number>(0);
  private readonly _limitSignal = signal<number>(20);
  private readonly _totalAlbumsSignal = signal<number>(0);

  readonly query = computed(() => this._querySignal().trim());
  readonly filter = computed(() => this._filterSignal());
  readonly albums = computed(() => this._albumsSignal());
  readonly loading = computed(() => this._loadingSignal());
  readonly error = computed(() => this._errorSignal());
  readonly hasMoreAlbums = computed(() => this._albumsSignal().length < this._totalAlbumsSignal());

  constructor() {
    effect(() => {
      const currentQuery = this.query();
      const currentFilter = this.filter();
      if (currentQuery) {
        this.fetchAlbums(currentQuery, currentFilter, 0);
      }
    });
  }

  async search(query: string, filterType: FilterType = 'album') {
    this._querySignal.set(query ?? '');
    this._filterSignal.set(filterType);
    this._pageSignal.set(0);
    this._albumsSignal.set([]);
  }

  async loadMoreAlbums(): Promise<void> {
    if (this.loading() || !this.hasMoreAlbums()) {
      return;
    }
    this._pageSignal.update(page => page + 1);
    await this.fetchAlbums(this.query(), this.filter(), this._pageSignal());
  }

  private async fetchAlbums(query: string, filterType: FilterType, page: number): Promise<void> {
    if (!query) {
      this._albumsSignal.set([]);
      return;
    }

    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    const offset = page * this._limitSignal();

    try {
      const spotifyResponse = await firstValueFrom(this.spotifyService.searchAlbums(query, this._limitSignal(), offset));
      const mappedAlbums = mapSpotifySearchResponseToAlbums(spotifyResponse);

      this._albumsSignal.update(currentAlbums => [...currentAlbums, ...mappedAlbums]);
      this._totalAlbumsSignal.set(spotifyResponse.albums.total);
    } catch (err: any) {
      this._errorSignal.set('Failed to load albums');
      this._albumsSignal.set([]);
    } finally {
      this._loadingSignal.set(false);
    }
  }
}


