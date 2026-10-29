import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { TicketsService } from '../../services/tickets';

@Component({
  selector: 'app-formulario-ticket',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-ticket.html',
  styleUrl: './formulario-ticket.css'
})
export class FormularioTicket implements OnInit {

  idTicket = 0;
  mensaje = '';
  error = '';

  formulario = new FormGroup({

    asunto: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)]
    }),

    solicitante: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),

    descripcion: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)]
    }),

    categoria: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    prioridad: new FormControl('Media', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    estado: new FormControl('Pendiente', {
      nonNullable: true,
      validators: [Validators.required]
    })

  });

  constructor(
    private ticketsService: TicketsService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.idTicket = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (this.idTicket) {
      this.cargarTicket();
    }
  }

  cargarTicket(): void {

    this.ticketsService
      .obtenerTicket(this.idTicket)
      .subscribe({

        next: (ticket) => {
          this.formulario.patchValue(ticket);
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(error);
          this.error = 'No fue posible cargar el ticket.';
          this.cdr.detectChanges();
        }

      });
  }

  guardar(): void {

    this.mensaje = '';
    this.error = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const ticket = this.formulario.getRawValue();

    if (this.idTicket) {

      this.ticketsService
        .actualizarTicket(this.idTicket, ticket)
        .subscribe({

          next: () => {
            this.mensaje = 'Ticket actualizado correctamente.';
            this.cdr.detectChanges();
          },

          error: (error) => {
            console.error(error);
            this.error = 'No fue posible actualizar el ticket.';
            this.cdr.detectChanges();
          }

        });

    } else {

      this.ticketsService
        .crearTicket(ticket)
        .subscribe({

          next: (respuesta) => {

            this.mensaje =
              `Ticket #${respuesta.id} registrado correctamente.`;

            this.formulario.reset({
              asunto: '',
              solicitante: '',
              descripcion: '',
              categoria: '',
              prioridad: 'Media',
              estado: 'Pendiente'
            });

            this.cdr.detectChanges();
          },

          error: (error) => {
            console.error(error);
            this.error = 'No fue posible registrar el ticket.';
            this.cdr.detectChanges();
          }

        });
    }
  }
}