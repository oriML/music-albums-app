import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { SpotifyAuthService } from '../services/spotify-auth.service';

export const spotifyAuthInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

  const authService = inject(SpotifyAuthService);
  let retry = 0;

  if (!req.url.startsWith('https://api.spotify.com')) {
    return next(req);
  }
  
  return from(authService.getAccessToken()).pipe(
    switchMap((token) => {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next(authReq).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            retry++;
            if (retry > 3) {
              return throwError(() => new Error('Unauthorized request after retry.'));
            }
            return from(authService.getAccessToken()).pipe(
              switchMap((newToken) => {
                const retryReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${newToken}` },
                });
                return next(retryReq);
              })
            );
          }
          return throwError(() => err);
        })
      );
    })
  );
}
