import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Stored_Keys } from '../constant/stored-keys';

export const gustGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem(Stored_Keys.route_posts_token)) {
    return router.parseUrl('/feed');
  } else {
    return true;
  }
};
