import { inject, Pipe, PipeTransform } from '@angular/core';
import { Album } from '../../core/models/album.model';
import { FavoritesService } from '../../core/services/favorites.service';

@Pipe({
  name: 'markFavorite'
})
export class MarkFavoritePipe implements PipeTransform {
  private favoritesService = inject(FavoritesService);

  transform(albums: Album[], ...args: unknown[]): Album[] {
    albums.forEach(album => {
      album.isFavorite = this.favoritesService.isFavorite(album.id);
    });
    return albums;
  }

}
