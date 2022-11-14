import {Categoria} from "./Categoria";

export class TipoProducto {
    idTipoProducto: number;
    idCategoria!: Categoria;
    descripcion!: string;
}