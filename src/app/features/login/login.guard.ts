import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";

export const loginGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) {
    router.createUrlTree(['/albums-panel']);
    return false;
  }
  return true;
};
