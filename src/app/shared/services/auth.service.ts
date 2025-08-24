import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "../../core/services/local-storage.service";
import { UserDbService } from "../../core/services/user-db.service";
import { User } from "../../core/models/user.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _router = inject(Router);
    private _localStorageService = inject(LocalStorageService);
    private _userDbService = inject(UserDbService);
    private readonly TOKEN_KEY = 'authToken';

    isLoggedIn(): boolean {
        return !!this._localStorageService.getItem<string>(this.TOKEN_KEY);
    }

    async register(username: string, password: string): Promise<boolean> {
        const existingUser = await this._userDbService.getUser(username);
        if (existingUser) {
            console.error('Registration failed: User already exists.');
            return false;
        }

        const passwordHash = btoa(password);
        const newUser: User = { username, passwordHash };

        try {
            await this._userDbService.addUser(newUser);
            return true;
        } catch (error) {
            console.error('Registration failed:', error);
            return false;
        }
    }

    async login(username: string, password: string): Promise<boolean> {
        const user = await this._userDbService.getUser(username);

        if (user && user.passwordHash === btoa(password)) {
            const mockToken = `mock-jwt-token-${username}`;
            this._localStorageService.setItem(this.TOKEN_KEY, mockToken);
            this._router.navigate(['/albums-panel']);
            return true;
        } else {
            console.error('Login failed: Invalid credentials.');
            return false;
        }
    }

    logout(): void {
        this._localStorageService.removeItem(this.TOKEN_KEY);
        this._router.navigate(['/login']);
    }
}
