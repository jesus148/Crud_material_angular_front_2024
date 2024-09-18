import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

// modulos de material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Persona } from '../../interfaces/persona';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';



// data momentanea
const listaPersonas: Persona[] = [
    {nombre:  'tomas' , apellido: 'Hydrogen', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    },
    {nombre:  'tomas' , apellido: 'Hydrogen', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    },
    {nombre:  'tomas' , apellido: 'Hydrogen', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    },
    {nombre:  'tomas' , apellido: 'Hydrogen', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    },
    {nombre:  'tomas' , apellido: 'Hydrogen', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    }
    ,
    {nombre:  'tomas' , apellido: 'Hydrogen', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    }
    ,
    {nombre:  'tomas' , apellido: 'Hydrogen', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    }
    ,
    {nombre:  'tomas' , apellido: 'Hydrogen', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    }
];



@Component({
  selector: 'app-list-persons',
  standalone: true,
  // CommonModule : imporata esto para los pipe
  imports: [MatToolbarModule, MatIconModule , MatCardModule , MatTableModule , CommonModule , MatPaginatorModule],
  templateUrl: './list-persons.component.html',
  styleUrl: './list-persons.component.css'
})
// implements OnInit , AfterViewInit : para el paginator
export class ListPersonsComponent  implements OnInit , AfterViewInit{


  // nombre de los head de la tabla = en el html
  displayedColumns: string[] = ['name' ,  'apellido' ,  'correo' ,  'tipoDocumento' ,   'documento' ,     'fecha de nacimiento'];


  // data para listar en la tabla
  // dataSource = ELEMENT_DATA;
  // data source para el paginator
  dataSource: MatTableDataSource<Persona>;



  // paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(){
      // paginator
    this.dataSource = new MatTableDataSource(listaPersonas);
  }

  ngOnInit(): void {
  }


  // paginator
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }





}
