import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../interfaces/catalog.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-catalog',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './list-catalog.component.html',
  styleUrl: './list-catalog.component.scss',
})



export class ListCatalogComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'nombre','calle', 'numero', 'colonia', 'ciudad', 'acciones'];

  // dataSource: Contact[] = []; 
  
  dataSource = new MatTableDataSource<Contact>([]); 

  @ViewChild(MatPaginator) paginator!: MatPaginator; 


  @Output() tabChange = new EventEmitter<{ index: number; contact: any }>();

  constructor(
    private contactService: ContactService,
  ){}
  
  ngOnInit(): void {

    this.contactService.contacts$.subscribe(()=>{
      this.loadContacts();
    });

    this.loadContacts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; 
  }

  loadContacts() {
    this.contactService.getAll().subscribe({
      next: (res: any) => {
        this.dataSource.data = res.entries;
      },
      error: (error) => {
        console.error('Error fetching contacts:', error);
      }
    });
  }

  editElement(id: number) {
    this.contactService.getById(id).subscribe({
      next: (res: any) => {
        const contact = res.data;
        this.tabChange.emit({ index: 1, contact:contact });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo conectar. Intente nuevamente.',
          confirmButtonText: 'OK'
        });
      }
    });
}

  deleteElement(id: number){
    Swal.fire({
      title: '¿Deseas eliminar el contacto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactService.delete(id).subscribe({
          next: (res: any) => {
            if(res.success){
              Swal.fire({
                icon: 'success',
                title: 'Se eliminó el contacto.',
                confirmButtonText: 'OK'
              });
            }
            this.contactService.TriggerActualizarLista();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el contacto. Intente nuevamente.',
              confirmButtonText: 'OK'
            });
          }
        });
      }
    });
  }

  downloadCSV() {
    const timestamp = new Date().toISOString().replace(/[:.-]/g, '_'); 
    const url = 'http://localhost/Ejercicio1/api-rest/public/api/download'; 

    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank'; 
    link.download = `contacts_${timestamp}.csv`; 
    
    window.open(url, '_blank');
  } 
}

