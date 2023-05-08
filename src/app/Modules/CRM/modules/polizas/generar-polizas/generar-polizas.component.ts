import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Catalogo } from 'src/app/Modules/shared/models/Data/Catalogo';
import { ClientePost, ClienteResp } from 'src/app/Modules/shared/models/Data/Cliente';
import { Extra } from 'src/app/Modules/shared/models/Data/Extra';
import { Plan } from 'src/app/Modules/shared/models/Data/Plan';
import { PolizaResp } from 'src/app/Modules/shared/models/Data/Poliza';
import { Precio } from 'src/app/Modules/shared/models/Data/Precio';
import { Servicio } from 'src/app/Modules/shared/models/Data/Servicio';
import { Venta } from 'src/app/Modules/shared/models/Data/Venta.model';
import { cotizacionDataForm } from 'src/app/Modules/shared/models/Pages/cotizacionDataForm.model';
import { datesDestiny } from 'src/app/Modules/shared/models/Pages/datesDestiny.model';
import { extraCostForm } from 'src/app/Modules/shared/models/Pages/extasForm.model';
import { ExtraForm } from 'src/app/Modules/shared/models/Pages/extra.model';
import { policiesData } from 'src/app/Modules/shared/models/Pages/policiesData.model';
import { policiesForm } from 'src/app/Modules/shared/models/Pages/policiesForm.model';
import { GetLocationService } from 'src/app/Modules/shared/services/get-location.service';
import { BeneficiariosService } from 'src/app/Modules/shared/services/requests/beneficiarios.service';
import { ExtrasPolizasService } from 'src/app/Modules/shared/services/requests/beneficiosExtras.service';
import { CatalogosService } from 'src/app/Modules/shared/services/requests/catalogos.service';
import { ClientesService } from 'src/app/Modules/shared/services/requests/clientes.service';
import { ExtrasService } from 'src/app/Modules/shared/services/requests/extras.service';
import { PlanesService } from 'src/app/Modules/shared/services/requests/planes.service';
import { PolizasService } from 'src/app/Modules/shared/services/requests/polizas.service';
import { PreciosService } from 'src/app/Modules/shared/services/requests/precios.service';
import { ServiciosService } from 'src/app/Modules/shared/services/requests/servicios.service';
import { VentasService } from 'src/app/Modules/shared/services/requests/ventas.service';

import Swal from 'sweetalert2';

// register Swiper custom elements


@Component({
  selector: 'app-generar-polizas',
  templateUrl: './generar-polizas.component.html',
  styleUrls: ['./generar-polizas.component.css']
})
export class GenerarPolizasComponent implements OnInit{

  nextId           :     number = 0;
  tags             :   string[] = [];
  paises           : Catalogo[] = [];
  inputValue       :     string = "";
  listadoPlanes    :     Plan[] = [];
  listadoPrecios   :   Precio[] = [];
  listadoServicios : Servicio[] = [];
  listPolizas      :      any[] = [];
  minDate          :     string = "";


  createItemForm(  ): FormGroup {
    return new FormGroup({
      nombres   : new FormControl('',Validators.required),
      apellidos : new FormControl('',Validators.required),
      age       : new FormControl('',Validators.required),
      ci        : new FormControl('',Validators.required),
      passport  : new FormControl('',Validators.required),
      email     : new FormControl('',Validators.required),
      ext       : new FormControl('999',Validators.required),
      telf      : new FormControl('',Validators.required),
      origen    : new FormControl('Bolivia',Validators.required),
      titular   : new FormControl(false,Validators.required),
      gender    : new FormControl('', Validators.required)
    });
  }


  constructor(
    private countriesService: CatalogosService,
    private planesServices : PlanesService,
    private preciosServices : PreciosService,
    private serviciosService : ServiciosService,

  ){
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {

    //Agregamos una poliza por defecto
    this.addItem();
    

    this.countriesService.getPaises().subscribe(
      paises => {
        this.paises = paises;
      }
    )


    this.planesServices.getPlanes().pipe(
      switchMap( planes => { 
        this.listadoPlanes = planes;
        return this.preciosServices.getPrecios();
      }),
      switchMap( precios => { 
        this.listadoPrecios = precios;
        return this.serviciosService.getServicios();
      })
    ).subscribe(  
      servicios => { 
        this.listadoServicios = servicios;
      }
      
    )
    
  }

  //Remover del listado de tags
  remove(tag: string) {
    let index = this.tags.indexOf(tag);
    this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];

    
    // this.modifyTags.emit(data);
    
  }


  //Agregar un tag al listado
  addTag(event: any) {
    if (event.key === 'Enter') {
      let tag = event.target.value.replace(/\s+/g, ' ');
      this.insertTag(tag);
      event.target.value = '';
    }
  }


  //Proceder a agregar en la lista de tags
  insertTag(tag: string) {
    if(tag!=="pais"){

      if (tag.length > 1 && !this.tags.includes(tag)) {
        
          tag.split(',').forEach(tag => {
            this.tags.push(tag);
          });
        
      }
    }
  }

  //Al momento de seleccionar un pais, confirma de que no sea el primero
  onSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const selectedValue = target.value;
      this.insertTag(selectedValue);
      target.value = "pais";
    }
  
  }


  addItem(){
    const poliza : any = {
      form : this.createItemForm(),
      id : this.nextId++,
    }

    this.listPolizas.push(poliza);
  }

  removeItem(id: number){
    this.listPolizas = this.listPolizas.filter(poliza => poliza.id !== id);
  }



  
}