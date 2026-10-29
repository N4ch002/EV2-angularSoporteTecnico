import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Ticket } from '../../models/ticket';
import { TicketsService } from '../../services/tickets';

@Component({
  selector: 'app-tickets',
  imports: [RouterLink, DatePipe],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class Tickets implements OnInit {

  tickets: Ticket[] = [];
  cargando = true;
  error = '';

  constructor(
    private ticketsService: TicketsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets(): void {

    this.cargando = true;
    this.error = '';

    this.ticketsService
      .obtenerTickets()
      .subscribe({

        next: (datos) => {
          this.tickets = datos;
          this.cargando = false;
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(error);
          this.error = 'No fue posible cargar los tickets. Verifique que la API esté funcionando.';
          this.cargando = false;
          this.cdr.detectChanges();
        }

      });
  }

  eliminarTicket(ticket: Ticket): void {

    const confirmado = confirm(
      `¿Desea eliminar el ticket #${ticket.id} "${ticket.asunto}"?`
    );

    if (!confirmado) {
      return;
    }

    this.ticketsService
      .eliminarTicket(ticket.id)
      .subscribe({

        next: () => {
          this.cargarTickets();
        },

        error: (error) => {
          console.error(error);
          alert('No fue posible eliminar el ticket.');
        }

      });
  }
}