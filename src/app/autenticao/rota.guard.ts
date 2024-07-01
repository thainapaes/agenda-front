import { CanActivateFn, Router } from '@angular/router';

export const rotaGuard: CanActivateFn = (route, state) => {
  const rota = new Router;

  if(localStorage.getItem('nome') === 'Thaina') {
    return true;
  } else {
    rota.navigateByUrl('/agenda');
    return false;
  }

};
