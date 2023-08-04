

export interface Venta {
    venta_id : number,
    username : string,
    total_pago : number,
    total : string,
    tipo_venta : number,
    tipo_descuento : string,
    status : number,
    precio : string,
    plus : number,
    officeId : number,
    fecha_venta : string,
    descuento : string,
    cliente_id : number,
    cantidad : string,
}

export interface VentaResp extends Omit<Venta, 'venta_id'>{
  id : number,
}
