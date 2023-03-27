import { Servicio } from "../Data/Servicio"
import { ExtraForm } from "./extra.model"
import { policie } from "./policie.model"

export interface policiesForm{
    id : number,
    isDropdownOpen :boolean,
    isPlainSelected: boolean,
    poliza : policie,
    listPlanes : Servicio[],
    polizaNombre : string,
    listExtras : ExtraForm[],
    
}