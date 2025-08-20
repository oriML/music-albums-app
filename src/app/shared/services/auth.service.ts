import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _router = inject(Router);
    isLoggedIn(): boolean {
        return true;
        return !!localStorage.getItem('token');
    }

    logout(): void {
        this._router.createUrlTree(['/auth']);
    }
}
