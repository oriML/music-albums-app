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
    private readonly USERNAME_KEY = 'loggedInUsername';

    isLoggedIn(): boolean {
        return !!this._localStorageService.getItem<string>(this.TOKEN_KEY);
    }

    async register(username: string, email: string, password: string): Promise<boolean> {
        const existingUser = await this._userDbService.getUser(email);
        if (existingUser) {
            console.error('Registration failed: User with this email already exists.');
            return false;
        }

        const passwordHash = btoa(password);
        const newUser: User = { username, email, passwordHash };

        try {
            await this._userDbService.addUser(newUser);
            console.log('User registered successfully.', username);
            return true;
        } catch (error) {
            console.error('Registration failed:', error);
            return false;
        }
    }

    async login(email: string, password: string): Promise<boolean> {
        const user = await this._userDbService.getUser(email);

        if (user && user.passwordHash === btoa(password)) {
            const mockToken = `mock-jwt-token-${user.username}`;
            this._localStorageService.setItem(this.TOKEN_KEY, mockToken);
            this._localStorageService.setItem(this.USERNAME_KEY, user.username);
            this._router.navigate(['/albums-panel']);
            return true;
        } else {
            console.error('Login failed: Invalid credentials.');
            return false;
        }
    }

    logout(): void {
        this._localStorageService.removeItem(this.TOKEN_KEY);
        this._localStorageService.removeItem(this.USERNAME_KEY);
        this._router.navigate(['/login']);
    }

    getLoggedInUsername(): string | null {
        return this._localStorageService.getItem<string>(this.USERNAME_KEY);
    }

    async checkEmailExists(email: string): Promise<boolean> {
        const user = await this._userDbService.getUser(email);
        return !!user;
    }
}

