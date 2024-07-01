import { Routes } from '@angular/router';
import { ContatoComponent } from './contato/contato.component';
import { BuscaComponent } from './busca/busca.component';
import { PaginaErrorComponent } from './pagina-error/pagina-error.component';
import { rotaGuard } from './autenticao/rota.guard';

export const routes: Routes = [
  {path: 'agenda', component: ContatoComponent},
  {path: 'busca', component: BuscaComponent, canActivate:[rotaGuard]},
  {path: '', redirectTo: '/agenda', pathMatch: 'full'},
  {path: '**', component: PaginaErrorComponent}
];
