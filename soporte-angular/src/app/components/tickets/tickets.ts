import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-tickets',
  imports: [RouterLink, DatePipe],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class Tickets {

  tickets: Ticket[] = [];
  cargando = false;
  error = '';

  cargarTickets(): void {
    // Se completa en la Etapa 4
  }

  eliminarTicket(ticket: Ticket): void {
    // Se completa en la Etapa 4
  }
}