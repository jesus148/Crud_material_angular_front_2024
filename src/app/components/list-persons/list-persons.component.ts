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
import { PersonaService } from '../../services/persona.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

// data momentanea
// const listaPersonas: Persona[] = [
//     {nombre:  'tomas' , apellido: 'Hydrogen', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
//       fechaNacimiento: new Date()
//     },
//     {nombre:  'jesus' , apellido: 'Hydrogen', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
//       fechaNacimiento: new Date()
//     },
//     {nombre:  'tomas' , apellido: 'auto', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
//       fechaNacimiento: new Date()
//     },
//     {nombre:  'tomas' , apellido: 'Hydrogen', correo: 'perez@gamil.com', tipoDocumentos: 'dni' , documento: 74782 ,
//       fechaNacimiento: new Date()
//     }
// ];


// decorador


@Component({
  // id componnente
  selector: 'app-list-persons',
  // actual angular
  standalone: true,
  // poder angular y otros componentes
  // CommonModule : imporata esto para los pipe
  imports: [MatToolbarModule, MatIconModule , MatCardModule , MatTableModule , CommonModule , MatPaginatorModule ,
    MatSortModule , MatFormFieldModule , MatInputModule , MatTooltipModule , MatButtonModule , MatDialogModule , MatProgressBarModule , MatSnackBarModule],
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

  // para mostrar el proogres bar o snniper
  loading: boolean = false;

  // paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // para el ordenamiento
  @ViewChild(MatSort) sort!: MatSort;



  // inicia
  // dialog:MatDialog : para el modal
  // _personaService : un servicio inicia _
  // _snackBar: MatSnackBar : es para los modal mensajes pequeños su configuracion
  constructor(public dialog:MatDialog ,private _personaService:PersonaService ,
    private _snackBar: MatSnackBar
  ){
      // tabla data
    // this.dataSource = new MatTableDataSource(listaPersonas);

    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.obtenerPersonas();
  }



  // metodo obitiene data del service all Personas
  obtenerPersonas(){
    // snipper
    this.loading = true;
          this._personaService.getPersonas().subscribe( data =>{
            // snipper
            this.loading = false;


            // table agrega data
            this.dataSource.data = data;

                // paginacion
          this.dataSource.paginator = this.paginator;
          // ordenamiento
          this.dataSource.sort = this.sort;
          })

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
    // toLowerCase : convierte a minusculas
    // trim : quita el espacio en blanco a los costados
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  // METODO PARA ACTUALIZAR Y AGREGAR
  // modal comonente hijo
  addEditPerson(id?: number){

    console.log(id);

    // abrir
    // muestra otro componente
    const dialogRef = this.dialog.open(AgregarEditarPersonaComponent, {
      // estilos para el componente mostrado
      width:'650px',
      //al dar click fuera del modal no debe cerrarse
      disableClose:true,
      data:{id :id}
    });

    // cerrar
    // cerrar componente
    dialogRef.afterClosed().subscribe(result => {

      // verificando si se registro para lista nuevamente
      // result es la variable booleana del modal registrar
      if(result){
              console.log(`Dialog result: ${result}`); //printer
              this.obtenerPersonas();//ejcuta el listado
      }

      // si no registro entonces no lista nuevamente pq es false
      //  [mat-dialog-close]="false" del boton cancelar en el modal

    });
  }




  // metodo elimina persona de la tabla
  deletePersona(id : number){
        // snipper
        this.loading = true;
    this._personaService.deletePersona(id).subscribe(()=>{
      //lista de nuevo si ya elimino
      this.obtenerPersonas();
      this.msjExito();
    })
  }


  // mensaje eliminado
  msjExito(){
    // llama al mensaje
    this._snackBar.open('la persona fue eliminada','',{
      // tiempo 2 segundos que dura en msj
      duration:2000
    })
  }






}
