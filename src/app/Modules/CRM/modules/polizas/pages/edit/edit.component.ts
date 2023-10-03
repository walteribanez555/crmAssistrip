import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryISO } from 'ngx-intl-tel-input';
import { switchMap } from 'rxjs';
import { Beneficiario } from 'src/app/Modules/shared/models/Data/Beneficiario';
import { Catalogo } from 'src/app/Modules/shared/models/Data/Catalogo';
import { Poliza } from 'src/app/Modules/shared/models/Data/Poliza';
import { Servicio } from 'src/app/Modules/shared/models/Data/Servicio';
import { Venta } from 'src/app/Modules/shared/models/Data/Venta.model';
import { BeneficiariosService } from 'src/app/Modules/shared/services/requests/beneficiarios.service';
import { CatalogosService } from 'src/app/Modules/shared/services/requests/catalogos.service';
import { PolizasService } from 'src/app/Modules/shared/services/requests/polizas.service';
import { ServiciosService } from 'src/app/Modules/shared/services/requests/servicios.service';
import { VentasService } from 'src/app/Modules/shared/services/requests/ventas.service';
import { UtilsService } from 'src/app/Modules/shared/services/utils/utils.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  private polizaService = inject(PolizasService);
  private beneficiarioService = inject(BeneficiariosService);
  private ventaService = inject(VentasService);
  private route = inject(ActivatedRoute);
  private servicioService = inject(ServiciosService);
  private catalogoService = inject(CatalogosService);
  private router = inject(Router);
  private utilService = inject(UtilsService);



  polizaId = -1;
  loading : boolean = false;
  openModal : boolean = false;
  countryIso = CountryISO;


  poliza  : Poliza | null = null;
  venta : Venta | null = null;
  servicio : Servicio | null = null;
  beneficiarios : Beneficiario[] = [];
  paises : Catalogo[] =[];


  fecha_retorno : string ="";
  fecha_salida : string = "";






  listPolizas : FormGroup[] = [];

  ngOnInit(): void {
    this.loading = true;


      this.catalogoService.getPaises().subscribe(
      (data)=> {
        this.paises = data.filter(item => item.status === 1);
      });


      this.route.params.subscribe( params => {
        this.polizaId = +params['id'];
        this.polizaService.getPolizasById(this.polizaId).pipe(
          switchMap(
            data => {
                this.poliza = data[0];
                return this.ventaService.getVentasById(this.poliza.venta_id)
            }
          ),
          switchMap(
            data => {
                this.venta = data[0];
                return this.beneficiarioService.getBeneficiarioById(this.polizaId);
            }
          ),
          switchMap(
            data => {
              this.beneficiarios = data;

              this.listPolizas = this.mapBeneficiariosToForm(this.beneficiarios);


              if(this.poliza){
                this.fecha_salida = this.poliza.fecha_salida.split('T')[0];
                this.fecha_retorno = this.poliza.fecha_retorno.split('T')[0];
              }


              const servicio_id = this.poliza? this.poliza.servicio_id : 0;

              return this.servicioService.getServicioById(servicio_id);
            }
          )

        ).subscribe({

          next :  ( data  ) => {
            this.loading = false;

            this.servicio = data[0];


            // console.log(this.beneficiarios);
            // console.log(this.poliza);
            // console.log(this.venta);

          },
          error : ( error ) => {
            console.log(error);
          }

        })

    })
  }


  mapBeneficiariosToForm( beneficiarios : Beneficiario[]){

    const beneficiariosForm : FormGroup[] =[];

    beneficiarios.forEach( beneficiario => {
      beneficiariosForm.push( this.createItemForm(beneficiario));
    })

    return beneficiariosForm;

  }


  createItemForm( beneficiario: Beneficiario  ): FormGroup {


    const nombres = beneficiario.primer_nombre + ' ' + (beneficiario.segundo_nombre === "0" ? '' : beneficiario.segundo_nombre);
    const apellidos = beneficiario.primer_apellido + ' ' + (beneficiario.segundo_apellido === "0" ? '' : beneficiario.segundo_apellido);
    const gender = beneficiario.sexo ===1 ? 'Masculino' : 'Femenino';
    return new FormGroup({
      cliente_id : new FormControl(beneficiario.beneficiario_id, Validators.required),
      nombres   : new FormControl(nombres,Validators.required),
      apellidos : new FormControl(apellidos,Validators.required),
      age       : new FormControl(beneficiario.fecha_nacimiento.split('T')[0],Validators.required),
      ci        : new FormControl(beneficiario.nro_identificacion,Validators.required),
      email     : new FormControl(beneficiario.email,Validators.required),
      telf      : new FormControl(beneficiario.telefono,Validators.required),
      origen    : new FormControl(beneficiario.origen,Validators.required),
      gender    : new FormControl(gender, Validators.required)
    });
  }






  updateCliente(event : any){
    console.log(event);

    if(!event.valid){
      console.log("El beneficiario no es valido");
    }





    console.log(event);

    const { cliente_id, nombres, apellidos, age, ci, email, telf, origen, gender } = event.value;



    const names = this.splitFirstWord(nombres);

              const firstName = names.firsWord;
              const secondName= names.resOfWord;

              const lastNames= this.splitFirstWord(apellidos);

              const firstLastName = lastNames.firsWord;
              const secondLastName = lastNames.resOfWord;


    this.beneficiarioService.updateBeneficiario(cliente_id,firstName, secondName, firstLastName, secondLastName, ci,email,telf,origen,gender,age)


    .subscribe(
      {
        next : (data) => {
          this.showSuccessNotification();
          this.router.navigate(['dashboard/polizas/listado-polizas']);
        },
        error : (err) => {
          this.showError(err);
        }
      }
    )

  }

  splitFirstWord(input: string) : {firsWord : string , resOfWord : string} {


    const inputNormalized:  string =  this.normalizeSpaces(input);

    const firstSpaceIndex = inputNormalized.indexOf(' ');

    if (firstSpaceIndex === -1) {
      // No hay espacios en el string, así que se devuelve el string en un array
      return {firsWord : input , resOfWord : ""};
    }

    const firstWord = inputNormalized.slice(0, firstSpaceIndex);
    const restOfString = inputNormalized.slice(firstSpaceIndex + 1);

    return {firsWord : firstWord , resOfWord : restOfString.trimEnd()}
  }

  normalizeSpaces(input: string): string {
    // Dividir el string en palabras, utilizando un espacio como separador
    const words = input.split(' ');

    // Filtrar palabras vacías (espacios adicionales)
    const nonEmptyWords = words.filter(word => word !== '');

    // Unir las palabras con un solo espacio entre ellas
    const normalizedString = nonEmptyWords.join(' ');

    return normalizedString;
  }

  updatePoliza(){
    if(this.poliza && this.venta)
    this.polizaService.putPolizas(this.polizaId, this.fecha_salida,this.fecha_retorno, this.poliza.status ).pipe(
      switchMap( (data) => {

        if(this.poliza?.status === 3 ){
          return this.ventaService.updateVenta(this.venta!.venta_id,1)
        }

        if( this.poliza?.status === 4){
          return this.ventaService.updateVenta(this.venta!.venta_id,0)
        }

        return this.ventaService.updateVenta(this.venta!.venta_id, 3);


      })

      ).subscribe({
      next: (data) => { this.showSuccessNotification(); this.router.navigate(['dashboard/polizas/listado-polizas'])},
      error : ( err) => { this.showError(err)},
    })
  }


  showSuccessNotification() {
    Swal.fire({
      icon: 'success',
      title: 'Modificado correctamente',
      text: 'Modificado correctamente',
      position: 'top-end',
      toast: true,
      timer: 3000,
      showConfirmButton: false
    });
  };


  showError(error : string){
    Swal.fire({
      position: 'top-end',
      icon : 'error',
      title: 'No se pudo realizar',
      showConfirmButton: false,
      timer: 1500

    });
  }

}
