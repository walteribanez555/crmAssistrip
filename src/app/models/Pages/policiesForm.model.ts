import { Servicio } from "../Data/Servicio"
import { policie } from "./policie.model"

export interface policiesForm{
    id : number,
    isDropdownOpen :boolean,
    poliza : policie,
    listPlanes : Servicio[],
    polizaNombre : string,
    
}