
export interface Cupon { 
    cupon_id : number,
    fecha_desde : string,
    fecha_hasta : string,
    servicio_id : number,
    status: number,
    tipo_valor : number,
    valor: number,
    
    
    
}


export interface CuponAplicado { 
    cupon : Cupon,
    monto : number,
    montoTotal: number,

}