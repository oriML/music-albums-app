import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "../../core/services/local-storage.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _router = inject(Router);
    private _localStorageService = inject(LocalStorageService);
    private _isLoggedIn = false;

    isLoggedIn(): boolean {
        this._isLoggedIn = this._localStorageService.getItem<string>('loggedIn') === 'true';
        return this._isLoggedIn;
    }

    login(): void {
        this._localStorageService.setItem('loggedIn', 'true');
        this._isLoggedIn = true;
        this._router.navigate(['/albums-panel']);
    }

    logout(): void {
        this._localStorageService.setItem('loggedIn', 'false');
        this._isLoggedIn = false;
        this._router.navigate(['/login']);
    }
}
