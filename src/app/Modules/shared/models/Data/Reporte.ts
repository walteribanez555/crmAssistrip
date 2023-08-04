// Generated by https://quicktype.io

export interface Reporte {
  venta_id:           number;
  beneficiario_id:    number;
  fecha_venta:        string;
  cantidad:           string;
  precio:             string;
  total:              string;
  total_pago:         number;
  descuento:          string;
  tipo_descuento:     null | string;
  primer_apellido:    string;
  segundo_apellido:   string;
  primer_nombre:      string;
  segundo_nombre:     string;
  nro_identificacion: string;
  fecha_nacimiento:   string;
  origen:             string;
  email:              string;
  telefono:           string;
  destino:            string;
  fecha_salida:       string;
  fecha_retorno:      string;
}