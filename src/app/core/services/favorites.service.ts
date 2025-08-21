import { Injectable, computed, inject, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Album } from '../models/album.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private localStorageService = inject(LocalStorageService);
  
  private _favorites = signal<Album[]>(this.loadFavorites());
  public readonly favorites = computed(() => this._favorites());

  private loadFavorites(): Album[] {
    return this.localStorageService.getItem<Album[]>('favoriteAlbums') || [];
  }

  private saveFavorites(favorites: Album[]): void {
    this.localStorageService.setItem('favoriteAlbums', favorites);
    this._favorites.set(favorites);
  }

  isFavorite(albumId: string): boolean {
    return this._favorites().some(album => album.id === albumId);
  }

  addFavorite(album: Album): void {
    const currentFavorites = this._favorites();
    if (!this.isFavorite(album.id)) {
      const updatedFavorites = [...currentFavorites, { ...album, isFavorite: true }];
      this.saveFavorites(updatedFavorites);
    }
  }

  removeFavorite(albumId: string): void {
    const currentFavorites = this._favorites();
    const updatedFavorites = currentFavorites.filter(album => album.id !== albumId);
    this.saveFavorites(updatedFavorites);
  }

  toggleFavorite(album: Album): void {
    const currentFavorites = this._favorites();
    const albumIndex = currentFavorites.findIndex(favAlbum => favAlbum.id === album.id);

    if (albumIndex > -1) {
      const updatedFavorites = currentFavorites.filter(favAlbum => favAlbum.id !== album.id);
      this.saveFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...currentFavorites, { ...album, isFavorite: true }];
      this.saveFavorites(updatedFavorites);
    }
  }
}
