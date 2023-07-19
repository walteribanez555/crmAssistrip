import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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


  polizaId = -1;
  loading : boolean = false;
  openModal : boolean = false;
  countryIso = CountryISO;


  poliza  : Poliza | null = null;
  venta : Venta | null = null;
  servicio : Servicio | null = null;
  beneficiarios : Beneficiario[] = [];
  paises : Catalogo[] =[];


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

              const servicio_id = this.poliza? this.poliza.servicio_id : 0;

              return this.servicioService.getServicioById(servicio_id);
            }
          )

        ).subscribe({

          next :  ( data  ) => {
            this.loading = false;

            this.servicio = data[0];


            console.log(this.beneficiarios);
            console.log(this.poliza);
            console.log(this.venta);

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


    const { cliente_id, nombres, apellidos, age, ci, email, telf, origen, gender } = event.value;







  }

}
