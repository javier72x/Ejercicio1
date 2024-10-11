import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContactService } from '../../../services/contact.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnChanges {
  
  @Input() contact: any; // Propiedad para recibir el contacto

  edit = false;
  id = 0;

  ngOnChanges() {
    if (this.contact) {
      this.nombre.setValue(this.contact.nombre);
      this.email.setValue(this.contact.email);
      this.telefono.setValue(this.contact.telefono);
      this.numero.setValue(this.contact.numero);
      this.calle.setValue(this.contact.calle);
      this.colonia.setValue(this.contact.colonia);
      this.ciudad.setValue(this.contact.ciudad);
      this.codigoPostal.setValue(this.contact.codigo_postal);
      this.estado.setValue(this.contact.estado);
      this.domicilio.setValue(this.contact.domicilio);
      this.latitud.setValue(this.contact.latitud);
      this.longitud.setValue(this.contact.longitud);

      this.edit = true;
      this.id = this.contact.id;
    }
  }
  
  private contactService = inject(ContactService);

  loading = false;
  nombre = new FormControl('', [Validators.required]);
  email = new FormControl('',
    [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
    ]
  );
  telefono = new FormControl('',
    [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.maxLength(10),
      Validators.minLength(10)
    ]
  );
  numero = new FormControl('', [Validators.required]);
  calle = new FormControl('', [Validators.required]);
  colonia = new FormControl('', [Validators.required]);
  ciudad = new FormControl('', [Validators.required]);
  codigoPostal = new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]);
  estado = new FormControl('', [Validators.required]);
  domicilio = new FormControl('', [Validators.required]);
  latitud = new FormControl({ value: '', disabled: false }, [Validators.required]);
  longitud = new FormControl({ value: '', disabled: false }, [Validators.required]);


  matcher = new MyErrorStateMatcher();

  validatePhone(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');  // Remueve cualquier carácter no numérico
  }

  cargarGPS() {
    this.loading = true;
    const domicilio = this.domicilio.value;

    this.contactService.getUbicacion(domicilio || '').subscribe({
      next: (res: any) => {
        if (res.length !== 0) {
          this.latitud.setValue(res[0].lat);
          this.longitud.setValue(res[0].lon);

        } else {
          Swal.fire({
            icon: 'warning',
            title: 'No se encontró el domicilio',
            text: 'Por favor verifica la dirección ingresada.',
            confirmButtonText: 'OK'
          });
        }
        this.loading = false;
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo hacer la búsqueda. Intente nuevamente.',
          confirmButtonText: 'OK'
        });
        this.loading = false;
      }
    });

  }

  cancel() {
    Swal.fire({
      title: '¿Deseas cancelar?',
      text: "¡Se limpiará todo el formulario!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.resetForm();
      }
    });
  }


  enviarDatos() {
    if (
      !this.nombre.value ||
      !this.email.value ||
      !this.telefono.value ||
      !this.numero.value ||
      !this.calle.value ||
      !this.colonia.value ||
      !this.codigoPostal.value ||
      !this.ciudad.value ||
      !this.estado.value ||
      !this.domicilio.value ||
      !this.latitud.value ||
      !this.longitud.value
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de enviar.',
      });
    } else {
      const datosFormulario = {
        nombre: this.nombre.value,
        email: this.email.value,
        telefono: this.telefono.value,
        numero: this.numero.value,
        calle: this.calle.value,
        colonia: this.colonia.value,
        codigo_postal: this.codigoPostal.value,
        ciudad: this.ciudad.value,
        estado: this.estado.value,
        domicilio: this.domicilio.value,
        latitud: this.latitud.value,
        longitud: this.longitud.value
      };

      if(this.edit){
        this.contactService.update(this.id,datosFormulario).subscribe({
          next: (res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                title: 'Se editó el contacto.',
                confirmButtonText: 'OK'
              });
            } else {
              Swal.fire({
                icon: 'warning',
                title: 'No se editó el contacto.',
                confirmButtonText: 'OK'
              });
            }
            this.contactService.TriggerActualizarLista();
            this.resetForm();
            this.loading = false;
  
            
          },
          error: (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo conectar. Intente nuevamente.',
              confirmButtonText: 'OK'
            });
            this.loading = false;
          }
        });
      }else{
        this.contactService.create(datosFormulario).subscribe({
          next: (res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                title: 'Se creó el contacto.',
                confirmButtonText: 'OK'
              });
            } else {
              Swal.fire({
                icon: 'warning',
                title: 'No se creó el contacto.',
                confirmButtonText: 'OK'
              });
            }
            this.contactService.TriggerActualizarLista();
            this.resetForm();
            this.loading = false;
  
            
          },
          error: (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo conectar. Intente nuevamente.',
              confirmButtonText: 'OK'
            });
            this.loading = false;
          }
        });
      }
    }
  }

  resetForm() {
    this.nombre.reset();
    this.email.reset();
    this.telefono.reset();
    this.numero.reset();
    this.colonia.reset();
    this.ciudad.reset();
    this.codigoPostal.reset();
    this.estado.reset();
    this.domicilio.reset();
    this.latitud.reset();
    this.longitud.reset();
    this.edit = false;
    this.id = 0;
  }
}
