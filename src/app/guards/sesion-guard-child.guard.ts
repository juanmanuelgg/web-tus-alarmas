import { CanActivateChildFn, Router } from '@angular/router';

export const sesionGuardChildGuard: CanActivateChildFn = (childRoute, state) => {
  const router = new Router();
  const email = localStorage.getItem('email');
  if (!email) {
    router.navigate(['/'])
    return false;
  }
  return true;
};
