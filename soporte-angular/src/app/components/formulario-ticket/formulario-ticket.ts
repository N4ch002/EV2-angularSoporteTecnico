import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-ticket',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-ticket.html',
  styleUrl: './formulario-ticket.css'
})
export class FormularioTicket {

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

  guardar(): void {

    this.mensaje = '';
    this.error = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    console.log('Ticket:', this.formulario.getRawValue());
  }
}