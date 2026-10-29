import { Routes } from '@angular/router';
import { Tickets } from './components/tickets/tickets';
import { FormularioTicket } from './components/formulario-ticket/formulario-ticket';

export const routes: Routes = [
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },
  { path: 'tickets', component: Tickets },
  { path: 'nuevo-ticket', component: FormularioTicket },
  { path: 'editar-ticket/:id', component: FormularioTicket },
  { path: '**', redirectTo: 'tickets' }
];