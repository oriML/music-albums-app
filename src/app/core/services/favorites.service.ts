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
  private readonly FAVORITES_KEY = 'favoriteAlbums';

  private loadFavorites(): Album[] {
    return this.localStorageService.getItem<Album[]>(this.FAVORITES_KEY) || [];
  }

  private saveFavorites(favorites: Album[]): void {
    this.localStorageService.setItem(this.FAVORITES_KEY, favorites);
    this._favorites.set(favorites);
  }

  isFavorite(albumId: string): boolean {
    return this._favorites().some(album => album.collectionId === albumId);
  }

  addFavorite(album: Album): void {
    const currentFavorites = this._favorites();
    if (!this.isFavorite(album.collectionId)) {
      const updatedFavorites = [...currentFavorites, { ...album, isFavorite: true }];
      this.saveFavorites(updatedFavorites);
    }
  }

  removeFavorite(albumId: string): void {
    const currentFavorites = this._favorites();
    const updatedFavorites = currentFavorites.filter(album => album.collectionId !== albumId);
    this.saveFavorites(updatedFavorites);
  }

  toggleFavorite(album: Album): void {
    if (this.isFavorite(album.collectionId)) {
      this.removeFavorite(album.collectionId);
    } else {
      this.addFavorite(album);
    }
  }
}
