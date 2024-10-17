import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Persona } from '../../interfaces/persona';
import { PersonaService } from '../../services/persona.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
// decorador
@Component({
  // id componente
  selector: 'app-agregar-editar-persona',
  standalone: true,
  // traer o overwrite components
  providers: [provideNativeDateAdapter()], //fechas
  // poder angular
  imports: [MatButtonModule, MatDialogModule , MatFormFieldModule , MatInputModule, FormsModule, ReactiveFormsModule , MatSelectModule ,  CommonModule , MatDatepickerModule ,MatNativeDateModule  ,  FormsModule, ReactiveFormsModule,ReactiveFormsModule, MatProgressSpinnerModule , MatSnackBarModule ],
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


  // para el spinner
  loading:boolean = false;


  // fecha actual es para datepicker
  maxDate : Date;


  // Para el modal
// titutlo modal cambiara segun sea registrar o actualizar
  Operacion: string = 'Agregar '; //x default saldra agregar
  id:number | undefined; // el id






  // inicia
  // public dialogRef : MatDialogRef<AgregarEditarPersonaComponent> : para el modal
  // private fb: FormBuilder : validaciones
  // _personaService:PersonaService : servicio
  // private _snackBar: MatSnackBar : mensajes
  // dateAdapter: DateAdapter<any> : el date picker sea en español de las fechas
  // @Inject(MAT_DIALOG_DATA) public data: any : es para recibir la data del listado solo 1 objeto
  constructor(public dialogRef : MatDialogRef<AgregarEditarPersonaComponent> ,
    private fb: FormBuilder , private _personaService:PersonaService ,    private _snackBar: MatSnackBar , private dateAdapter: DateAdapter<any> , @Inject(MAT_DIALOG_DATA) public data: any
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
      // documento solo debe tener numeros
      documento:[null, [Validators.required , Validators.pattern("^[0-9]*$")] ],
      fechaNacimiento:[null, Validators.required]
    })
    // printer data del listado
    // console.log("data" , data);

    // setea la variable id si se envia del listado
    this.id = data.id;

    // formato a la fecha en español osea el datepciker las opciones sera en español
    dateAdapter.setLocale('es');
  }
  ngOnInit(): void {
    // ejecuta el metodo
    this.esEditar(this.id);
  }


  // verificando si es editar
  esEditar(id : number | undefined ){
    // si tiene el id es editar
    if( id !== undefined){
      // cambiar el titulo del modal
      this.Operacion = 'Editar '
      this.getPersona(id);
    }
  }



  // metodo obtener todo persona x id
  // para llenar los campos puesdes usar el setvalue del form pero se debe llenar todos los campos , tambien puedes usar el patchValue y solo llenar ciertos campos
  getPersona(id:number){
    this._personaService.getPersona(id).subscribe( (data :any) =>{

      console.log(new Date(data[0].fechaNacimiento))


      // llenando los campos del modal con la data
      this.form.setValue({
        // campos = al form   |    data del rest
        nombre:data[0].nombre,
        apellido:data[0].apellido,
        correo:data[0].correo,
        tipoDocumento:data[0].tipoDocumento,
        documento: data[0].documento,
        fechaNacimiento : new Date(data[0].fechaNacimiento)
      })


      // this.form.setValue({
      //   // campos = al form   |    data del rest
      //   nombre:data[0].nombre,
      //   apellido:data.apellido,
      //   correo:data.correo,
      //   tipoDocumento:this.tipoDocumento,
      //   documento: data.documento,
      //   fechaNacimiento : data.fechaNacimiento
      // })
    })
  }







  // METODO AGREGAR
  // ojo: en caso no ejecute este metodo usar los imports de forms
  addEditPersona(){


    // si las validaciones son invalidades se queda aca
    // si usas el [disabled] en el button del html ya no uses aqui
    // if(this.form.invalid){
    //   return;
    // }

    console.log(this.form.value.fechaNacimiento)


    // con la clase guia llenamos los atibutos del form html
    // recordar que los form guardan la data de los inputs
    const persona:Persona ={
      nombre : this.form.value.nombre,
      apellido : this.form.value.apellido,
      correo : this.form.value.correo,
      tipoDocumento : this.form.value.tipoDocumento,
      documento : this.form.value.documento,
      //2022-09-05T03:00:00.00Z viene del front
      // toISOString : formatea un date y convierte a string
      // fechaNacimiento : this.form.value.fechaNacimiento.toISOString()

      // estos problemas de fechas se pueden soluionar desde el front o back.ect
      // lo formateamos y nos quedamos con 2022-09-05 es la estructura del sql guiarte de esa estructura
      // slice(0,10) : corta
      fechaNacimiento : this.form.value.fechaNacimiento.toISOString().slice(0,10)
    }


    // muestra el spinner
    this.loading =true;

    // print form para ver sus metodos
    // console.log(this.form);



    // si el id es null entonces se registra
    if(this.id == undefined){
      // metodo service registra
      this._personaService.addPersona(persona).subscribe( ()=>{
        this.loading = false; //spinner close

        this.msjExito('agregada');
        // envias un dialogRef.close(true) osea un true
        // para confirmar que se registro , es el listado
        this.dialogRef.close(true); //close modal
        // console.log('persona agregada'); //printer
      })

      // si el id no es vacio se actualiza
    }else{

      this._personaService.updatePersona(this.id,persona).subscribe( ()=>{
        this.loading = false;
        this.msjExito('actualizada');
        this.dialogRef.close(true);
      })
    }


  }






    // mensaje registrado
    msjExito(operacion: string){
      // llama al mensaje
      this._snackBar.open(`la persona fue ${operacion} con exito`,'',{
        // tiempo 2 segundos que dura en msj
        duration:2000
      })
    }










}
