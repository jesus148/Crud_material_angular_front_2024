import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

// modulos de material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Persona } from '../../interfaces/persona';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';//modal
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { AgregarEditarPersonaComponent } from '../agregar-editar-persona/agregar-editar-persona.component';

// data momentanea
const listaPersonas: Persona[] = [
    {nombre:  'tomas' , apellido: 'Hydrogen', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    },
    {nombre:  'jesus' , apellido: 'Hydrogen', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    },
    {nombre:  'tomas' , apellido: 'auto', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    },
    {nombre:  'tomas' , apellido: 'Hydrogen', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    },
    {nombre:  'tomas' , apellido: 'jesus', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    }
    ,
    {nombre:  'aquino' , apellido: 'baboso', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    }
    ,
    {nombre:  'tomas' , apellido: 'wendy', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    }
    ,
    {nombre:  'marco' , apellido: 'Hydrogen', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
      fechaNacimiento: new Date()
    }
];


// decorador
@Component({
  // id componnente
  selector: 'app-list-persons',
  // actual angular
  standalone: true,
  // poder angular y otros componentes
  // CommonModule : imporata esto para los pipe
  imports: [MatToolbarModule, MatIconModule , MatCardModule , MatTableModule , CommonModule , MatPaginatorModule ,
    MatSortModule , MatFormFieldModule , MatInputModule , MatTooltipModule , MatButtonModule , MatDialogModule],
  templateUrl: './list-persons.component.html', //lo q se vera
  styleUrl: './list-persons.component.css'  //estilos
})
// clase
// implements OnInit , AfterViewInit : para el paginator
export class ListPersonsComponent  implements OnInit , AfterViewInit{


  // nombre de los head de la tabla = en el html
  displayedColumns: string[] = ['name' ,  'apellido' ,  'correo' ,  'tipoDocumento' ,   'documento' ,   'fecha de nacimiento' ,  'acciones'];


  // data para listar en la tabla
  // dataSource = ELEMENT_DATA;
  // data source para el paginator
  dataSource: MatTableDataSource<Persona>;



  // paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // para el ordenamiento
  @ViewChild(MatSort) sort!: MatSort;



  // inicia
  // dialog:MatDialog : para el modal
  constructor(public dialog:MatDialog){
      // paginator
    this.dataSource = new MatTableDataSource(listaPersonas);
  }
  ngOnInit(): void {
  }


  // paginator
  // se carga despues de inciar el componente o la vista solo 1 vez
  ngAfterViewInit() {
    // paginacion
    this.dataSource.paginator = this.paginator;
    // ordenamiento
    this.dataSource.sort = this.sort;
  }






  // metodo para filtrar por el input
  applyFilter(event: Event) {
    // guarda el valor
    const filterValue = (event.target as HTMLInputElement).value;
    // filtra de la data x el campo de apellido y nombre
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  // modal comonente hijo
  addEditPerson(){
    // abrir
    // muestra otro componente
    const dialogRef = this.dialog.open(AgregarEditarPersonaComponent, {
      // estilos para el componente mostrado
      width:'6  50px',
      disableClose:true
    });

    // cerrar
    // cerrar componente
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


















}
