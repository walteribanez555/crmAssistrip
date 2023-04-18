import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/models/Data/Servicio';
import { cotizacionDataForm } from 'src/app/models/Pages/cotizacionDataForm.model';
import { FormCotizarModel } from 'src/app/models/Pages/formCotizar.model';
import { cotizacionIntefaceService } from 'src/app/services/cotizacioninterface.service';
import { PreciosService } from 'src/app/services/precios.service';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Precio } from 'src/app/models/Data/Precio';
import { CuponesService } from 'src/app/services/cupones.service';
import { Cupon, CuponAplicado } from 'src/app/models/Data/Cupon';
import { switchMap } from 'rxjs';
import { ExtraForm } from 'src/app/models/Pages/extra.model';
import Swal from 'sweetalert2';
import { ClientesService } from 'src/app/services/clientes.service';
import { VentasService } from 'src/app/services/ventas.service';
import { ClientePost } from 'src/app/models/Data/Cliente';



@Component({
  selector: 'app-datos-polizas',
  templateUrl: './datos-polizas.component.html',
  styleUrls: ['./datos-polizas.component.css'],
  animations: [
    

  ]
})

export class DatosPolizasComponent implements OnInit {

  datosCotizacion : FormCotizarModel = {
    initialDate: '',
    finalDate: '',
    tags: [],
    origen: '',
    listCotizaciones : [],
    email: '',
    telefono: '',
  };
  datosCotizacionMenores : cotizacionDataForm[] = [];
  datosCotizacionMayores : cotizacionDataForm[] = [];
  servicioMenores : Servicio | null = null;
  servicioMayores : Servicio | null = null;
  precios : Precio[]= [];
  total = 0;
  totalBruto = 0 ;

  totalEnteros = 0;
  totalDecimales : any;

  listPolizas : any[] = [];

  costoMenores = 0;
  costoMayores = 0;


  precioMayores = { 
    precio : 0,
    precioTotal : 0,
    cantidadPolizas : 0,
    servicio : this.servicioMayores
  }

  precioMenores = {
    precio : 0,
    precioTotal : 0,
    cantidadPolizas : 0,
    servicio: this.servicioMenores
  }

  



  public itemHeight = 150;
  private startY = 0;
  private startHeight = 0;
  public maxHeightReached = false;
  public maxHeight = 300;
  public minHeight = 150;
  public minHeightReached = true;
  nextId : number = 0;
  diffDays = -1;

  listCupones : Cupon[] = [];

  btn_pagar = false;
  stateBottom : 1| 2 | 3 = 1;

  listExtras : ExtraForm[]= [];
  dataExtra : any[] = []


  listDescuentos : CuponAplicado[] =[] 

  



  constructor(
    private dataService: cotizacionIntefaceService,
    private preciosService : PreciosService,
    private cuponesService : CuponesService,
    private clientesService : ClientesService,
    private ventasService : VentasService,
    private router : Router
  ){

    


  }


  ngOnInit(): void {
    this.datosCotizacion  = this.dataService.sharedData;
    this.datosCotizacionMenores = this.dataService.cotizacionMenores;
    this.datosCotizacionMayores = this.dataService.cotizacionMayores;
    this.servicioMenores  = this.dataService.servicioMenores;
    this.servicioMayores = this.dataService.servicioMayores;
    this.listExtras = this.dataService.listExtras;


    this.comparar(this.datosCotizacion.initialDate,this.datosCotizacion.finalDate);


    this.datosCotizacionMayores.forEach(element => {
      this.listPolizas.push(
        {
          form : this.createItemForm(),
          isOpen : false,
          servicio : this.servicioMayores,
          type: 2,
        }
      )
      
    });

    this.datosCotizacionMenores.forEach(element => {
        this.listPolizas.push(
          {
            form : this.createItemForm(),
            isOpen : false,
            servicio : this.servicioMenores,
            type: 1,
          }
        )  
    });


    this.preciosService.getPrecios().pipe(
      switchMap(data => {
        this.precios = data;
        this.obtenerCostoPoliza();
        return this.cuponesService.getCupones();
      })

    ).subscribe(
      data => {
        this.listCupones = data.filter(cupon => cupon.status===1);
        console.log(this.listCupones);
        this.precioMayores={
          precio : this.costoMayores,
          precioTotal : this.costoMayores * this.datosCotizacionMayores.length,
          cantidadPolizas : this.datosCotizacionMayores.length,
          servicio : this.servicioMayores,
        }

        this.precioMenores = {
          precio : this.costoMenores,
          precioTotal : this.costoMenores * this.datosCotizacionMenores.length,
          cantidadPolizas : this.datosCotizacionMenores.length,
          servicio: this.servicioMenores
        }


        this.realizarDescuentos();

        this.dataExtra = this.listExtras.map(
          extra => {
            return{
              extra : extra.extra,
              cantidad: this.datosCotizacionMayores.length+ this.datosCotizacionMenores.length,
              costo : extra.extra.complemento ? parseFloat(extra.extra.complemento ) :  0,
              costoTotal : extra.extra.complemento ? (parseFloat(extra.extra.complemento)* this.diffDays * (this.datosCotizacionMayores.length + this.datosCotizacionMenores.length)): 0,

            }
          }
        )

        this.totalBruto = this.precioMayores.precioTotal + this.precioMenores.precioTotal  +this.dataExtra.reduce((a,b)=> a+b.costoTotal,0);
        this.total = this.totalBruto  - this.listDescuentos.reduce((a,b) => a + b.montoTotal,0);

        
         const { parteEntera, parteDecimal}   =this.dividirTotal(this.total)

         this.totalEnteros = parteEntera,
         this.totalDecimales = parteDecimal
        
      }
    )

    

    




    


  }



  createItemForm(  ): FormGroup {
    return new FormGroup({
      nombres: new FormControl('',Validators.required),
      apellidos: new FormControl('',Validators.required),
      age: new FormControl(0,Validators.required),
      ci : new FormControl('', Validators.required),
      passport: new FormControl('',Validators.required),
      email : new FormControl('',Validators.required),
      telf : new FormControl('',Validators.required),
      origen: new FormControl('',Validators.required),
      titular : new FormControl(false,Validators.required),
    });
  }


  expand(){
    if(this.minHeightReached){
      
      this.itemHeight = this.maxHeight;
    }
    else{
      this.itemHeight = this.minHeight;
      
    }
    this.minHeightReached = !this.minHeightReached;

    

  }
  reducir(){
   this.itemHeight = this.minHeight;
   this.minHeightReached= true;
  }

  salir(){
    this.router.navigate(['/home']);
  }

  
  onTouchStart(event: TouchEvent) {
    // Record the initial touch position and height of the element
    this.startY = event.touches[0].clientY;
    this.startHeight = this.itemHeight;
  }

  
  onTouchMove(event: TouchEvent) {
    this.minHeightReached = false;
    // Calculate the distance between the initial touch position and the current touch position
    const deltaY = event.touches[0].clientY - this.startY;

    // Calculate the new height of the element based on the distance and direction of the drag
    let newHeight = this.startHeight - deltaY;
    newHeight = Math.max(this.minHeight, Math.min(newHeight, this.maxHeight));


    // Update the height of the element
    this.itemHeight = newHeight;
    this.maxHeightReached = newHeight === this.maxHeight;
    this.minHeightReached = newHeight === this.minHeight;
  }


  onTouchEnd(event: TouchEvent) {
    // Clear the initial touch position and height of the element
    this.startY = 0;
    this.startHeight = 0;
  }

  siguiente(){
   
   
  }


  openForm(  poliza : any ){

    poliza.isOpen = !poliza.isOpen;
    
  }


  comprobarDatos(){
    const polizas  = this.listPolizas.filter(poliza => poliza.form.value.titular)

    if(polizas.length!==1){
      return;
    }


    this.clientesService
  .getClienteById(polizas[0].form.value.ci)
  .pipe(
    switchMap((data) => {
      let cliente_id: number = 0;
      if (data.length > 0) {
        cliente_id = data[0].cliente_id;
        return this.ventasService.postVenta(
          cliente_id,
          this.listPolizas.length,
          this.listDescuentos.reduce((a, b) => a + b.montoTotal, 0),
          this.datosCotizacion.initialDate,
          this.datosCotizacion.finalDate,
          this.total
        );
      } else {
        const nuevoCliente: ClientePost = {
          apellido: polizas[0].form.value.apellidos,
          nombre: polizas[0].form.value.nombres,
          nit_ci: polizas[0].form.value.ci,
          origen: polizas[0].form.value.origen,
          email: polizas[0].form.value.email,
          nro_contacto: polizas[0].form.value.telf,
        };
        // Use `switchMap` to chain the `postCliente` Observable to the `postVenta` Observable
        return this.clientesService.postCliente(nuevoCliente).pipe(
          switchMap((data) => {
            cliente_id = data.id;
            return this.ventasService.postVenta(
              cliente_id,
              this.listPolizas.length,
              this.listDescuentos.reduce((a, b) => a + b.montoTotal, 0),
              this.datosCotizacion.initialDate,
              this.datosCotizacion.finalDate,
              this.total
            );
          })
        );
      }
    })
  )
  .subscribe((data) => {
    console.log(data);
  });

  }


  backPrev(){
    this.router.navigate(['./cotizar']);
  }


  obtenerCostoPoliza( ){


    const rangoPrecioMenores =  this.precios.find(precio => precio.servicio_id === this.servicioMenores?.servicio_id  && this.betweenTheRange(precio.limite_inferior, precio.limite_superior)); 
    

    const rangoPrecioMayores = this.precios.find(precio => precio.servicio_id === this.servicioMayores?.servicio_id  && this.betweenTheRange(precio.limite_inferior, precio.limite_superior));

    if(rangoPrecioMenores){
      const costoMenores= this.realizarCalculo(rangoPrecioMenores) ;
      this.costoMenores = costoMenores;
    }

    if(rangoPrecioMayores){
      const costoMayores = this.realizarCalculo(rangoPrecioMayores);
      this.costoMayores = costoMayores;
    }

    
    return 0;

  }

  betweenTheRange( liInf: number, liSup: number ) : boolean{
    
    return this.diffDays >= liInf && this.diffDays <= liSup;
  }



  realizarCalculo(rangoPrecio : Precio){
    let precio :number = 0;
    if(rangoPrecio.tipo_ecuacion ===1){
      precio=this.ecuacionCurva(rangoPrecio, this.diffDays) * this.diffDays;
    }
    if(rangoPrecio.tipo_ecuacion ===2){
      precio = this.ecuacionRecta(rangoPrecio, this.diffDays) *this.diffDays;
    }

    return precio;

  }


  ecuacionCurva(rangoPrecio : Precio, dias : number){
    const valor = Math.pow(dias, rangoPrecio.intercepto)
    return valor*rangoPrecio.pendiente;

  }


  ecuacionRecta( rangoPrecio : Precio, dias: number){
      
      
  
      const valor = (rangoPrecio.pendiente*dias) + rangoPrecio.intercepto;
  
      return valor;
  
  }

  comparar(initialDay : string, finalDay : string){
    const date1: Date = new Date(initialDay);
    const date2: Date = new Date(finalDay);
  
      // Get the difference in milliseconds
      const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  
      // Convert the difference to days
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
      if(!isNaN(diffInDays)){
        this.diffDays= diffInDays;
      }
  
      this.diffDays = diffInDays;
   }




    realizarDescuentos(){
        this.listDescuentos = this.listCupones.filter(cupon => cupon.servicio_id === this.servicioMayores?.servicio_id || cupon.servicio_id === this.servicioMenores?.servicio_id)
                                .map(cupon => {
                                  const servicioDesc = this.precioMayores.servicio?.servicio_id === cupon.servicio_id ? this.precioMayores : this.precioMenores;
                                  switch (cupon.tipo_valor) {
                                    case 1:
                                      return {
                                        cupon : cupon,
                                        monto : servicioDesc.precio * (cupon.valor/100),
                                        montoTotal : servicioDesc.precioTotal * (cupon.valor/100),
                                      }
                                    case 2:
                                      return {
                                        cupon : cupon,
                                        monto : cupon.valor,
                                        montoTotal : cupon.valor* servicioDesc.cantidadPolizas,
                                      }
                                    default:
                                      return {
                                        cupon : cupon,
                                        monto : servicioDesc.precioTotal * (cupon.valor/100),
                                        montoTotal : cupon.valor* servicioDesc.cantidadPolizas,

                                      }
                                  }})
                              
    }

    dividirTotal( numero : number ){
            
      let parteEntera;
      let parteDecimal : string = "";

      if (numero % 1 === 0) {
        parteEntera = numero;
        parteDecimal = "0";
      } else {
        parteEntera = Math.trunc(numero);
        parteDecimal = (numero - parteEntera).toFixed(3).toString().split(".")[1].substring(0, 3);
      }

      return({
        parteEntera,
        parteDecimal
      })
    }


}
