import { CanActivateFn, Router } from '@angular/router';

export const sesionGuardGuard: CanActivateFn = (route, state) => {
  const router = new Router();
    const email = localStorage.getItem('email');
    if (!email) {
      router.navigate(['/'])
      return false;
    }
    return true;
};
