import api from "./api";
import {ListaDatos} from "../models/ListaDatos";
import {FichaClinica, FichaClinicaEjemplo} from "../models/FichaClinica";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Persona} from "../models/Persona";
import {Categoria} from "../models/Categoria";
import {TipoProducto} from "../models/TipoProducto";

const path = "stock-nutrinatalia/fichaClinica"

const obtenerUsuario = async () => {
    const datos = await AsyncStorage.getItem("user")
    if (datos) return (JSON.parse(datos).usuarioLogin as string);
    else return ""
}

export const obtenerFichasClinicas = async function (): Promise<FichaClinica[]> {
    return api.get<ListaDatos<FichaClinica>>(path)
        .then(response => response.data.lista)
        .catch(error => {
            console.error(error);
            return ([] as FichaClinica[])
        });
}

export const agregarFichaClinica = async function (ficha: FichaClinica): Promise<FichaClinica> {
    return api.post<FichaClinica>(path, ficha, {
        headers: {
            usuario: await obtenerUsuario()
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            return ({} as FichaClinica);
        });
}

export const modificarFichaClinica = async function (ficha: ModificarFichaParametros): Promise<FichaClinica> {
    return api.put<FichaClinica>(path, ficha, {
        headers: {
            usuario: await obtenerUsuario()
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            return ({} as FichaClinica);
        });
}

export const obtenerFichaClinica = async function (ejemplo: FichaClinicaEjemplo): Promise<FichaClinica[]> {
    return api.get<ListaDatos<FichaClinica>>(path, {
        params: {
            ejemplo: JSON.stringify(ejemplo)
        }
    })
        .then(response => response.data.lista)
        .catch(error => {
            console.error(error);
            return ([] as FichaClinica[])
        });
}


// Tipos

type ModificarFichaParametros = {
    idFichaClinica: number;
    observacion: string;
}

// EXTRAS

export const obtenerEmpleados = async function (): Promise<Persona[]> {
    return api.get<ListaDatos<Persona>>("stock-nutrinatalia/persona", {
        params: {
            ejemplo: JSON.stringify({soloUsuariosDelSistema: true})
        }
    })
        .then(response => response.data.lista)
        .catch(error => {
            console.error(error);
            return [] as Persona[];
        });
};


export const obtenerClientes = async function (): Promise<Persona[]> {
    return api.get<ListaDatos<Persona>>("stock-nutrinatalia/persona", {
        params: {
            ejemplo: JSON.stringify({soloUsuariosDelSistema: false})
        }
    })
        .then(response => response.data.lista)
        .catch(error => {
            console.error(error);
            return [] as Persona[];
        });
};

export const obtenerCategoria = async function (): Promise<Categoria[]> {
    return api.get<ListaDatos<Categoria>>("stock-nutrinatalia/categoria")
        .then(response => response.data.lista)
        .catch(error => {
            console.error(error);
            return [] as Categoria[]
        });
};

export const obtenerTipoProducto = async function (idCategoria: number): Promise<TipoProducto[]> {
    return api.get<ListaDatos<TipoProducto>>("stock-nutrinatalia/tipoProducto", {
        params: {
            ejemplo: JSON.stringify({
                "idCategoria": {
                    "idCategoria": idCategoria
                }
            })
        }
    })
        .then(response => response.data.lista)
        .catch(error => {
            console.error(error);
            return [] as TipoProducto[];
        })
};