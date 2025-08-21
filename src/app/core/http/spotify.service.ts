import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SpotifyAlbumSearchResponse, SpotifyAlbumDetailsResponse } from '../models/spotify-models';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.spotify.com/v1';

  searchAlbums(query: string, limit: number, offset: number): Observable<SpotifyAlbumSearchResponse> {
    let params = new HttpParams();
    params = params.append('q', query);
    params = params.append('type', 'album'); // Always search for albums
    params = params.append('limit', limit.toString());
    params = params.append('offset', offset.toString());
    
    return this.http.get<SpotifyAlbumSearchResponse>(`${this.baseUrl}/search`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getAlbumDetails(albumId: string): Observable<SpotifyAlbumDetailsResponse> {
    return this.http.get<SpotifyAlbumDetailsResponse>(`${this.baseUrl}/albums/${albumId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
