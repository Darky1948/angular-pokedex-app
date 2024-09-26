import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  console.info('Le guard a bien été appelé !');
  return true;
};
