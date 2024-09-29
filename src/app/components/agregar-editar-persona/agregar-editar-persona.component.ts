import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Persona } from '../../interfaces/persona';


// decorador
@Component({
  // id componente
  selector: 'app-agregar-editar-persona',
  standalone: true,
  // traer o overwrite components
  providers: [provideNativeDateAdapter()], //fechas
  // poder angular
  imports: [MatButtonModule, MatDialogModule , MatFormFieldModule , MatInputModule, FormsModule, ReactiveFormsModule , MatSelectModule ,  CommonModule , MatDatepickerModule ,MatNativeDateModule  ,     FormsModule, ReactiveFormsModule,
    ReactiveFormsModule, ],
  // plantilla
  templateUrl: './agregar-editar-persona.component.html',
  // estilos
  styleUrl: './agregar-editar-persona.component.css'
})
// clase
export class AgregarEditarPersonaComponent {



  // combo tipo de documento
  tipoDocumento: string[] = ['DNI', 'Libreta Civica', 'Pasaporte'];


  // validaciones
  // puedes usar el console.log para ver los eventos del form
  form: FormGroup;


  // fecha actual
  maxDate : Date;





  // inicia
  // public dialogRef : MatDialogRef<AgregarEditarPersonaComponent> : para el modal
  // private fb: FormBuilder : validaciones
  constructor(public dialogRef : MatDialogRef<AgregarEditarPersonaComponent> ,
    private fb: FormBuilder
  ){

    // fecha actual
    // desabilita >= fechas mayores a la actual
    this.maxDate = new Date();

    // validaciones al iniciar estaran vacios
    this.form = this.fb.group({
      // campos = en el html
      // []: si son varios validators
      // Validators.required : al inciar sale osea se cumple esto pq esta vacio
      // Validators.maxLength(20) : maximo de campos
      // Validators.pattern("^[0-9]*$")] : numeros de * solo de 0 a 9
      nombre:['',  [Validators.required , Validators.maxLength(20)]],
      apellido:['', Validators.required],
      correo:['', [Validators.required, Validators.email] ],
      tipoDocumento:[null, Validators.required],
      documento:[null, [Validators.required , Validators.pattern("^[0-9]*$")] ],
      fechaNacimiento:[null, Validators.required]
    })
  }
  ngOnInit(): void {
  }







  // METODO EDITAR
  // ojo: en caso no ejecute este metodo usar los imports de forms
  addEditPersona(){


    // si las validaciones son invalidades se queda aca
    // si usas el [disabled] en el button del html ya no uses aqui
    // if(this.form.invalid){
    //   return;
    // }


    // con la clase guia llenamos los atibutos del form html
    const persona:Persona ={
      nombre : this.form.value.nombre,
      apellido : this.form.value.apellido,
      correo : this.form.value.correo,
      tipoDocumentos : this.form.value.tipoDocumento,
      documento : this.form.value.documento,
      fechaNacimiento : this.form.value.fechaNacimiento,
    }


    // print form para ver sus metodos
    console.log(this.form);

  }
















}
