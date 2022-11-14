import {Persona} from "./Persona";
import {TipoProducto} from "./TipoProducto";

export interface FichaClinica {
    idFichaClinica?: number;
    motivoConsulta: string;
    diagnostico: string;
    observacion?: string;
    idEmpleado: Persona;
    idCliente: Persona;
    idTipoProducto: TipoProducto;
    fechaHora?: string;
}

export type FichaClinicaEjemplo = {
    idEmpleado?: {
        idPersona: number
    },
    idCliente?: {
        idPersona: number
    },
    fechaDesdeCadena?: string,
    fechaHastaCadena?: string,
    idTipoProducto?: {
        idTipoProducto: number
    },
};