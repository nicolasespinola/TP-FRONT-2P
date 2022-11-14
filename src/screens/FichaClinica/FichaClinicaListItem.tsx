import React from "react";
import {FichaClinica} from "../../models/FichaClinica";
import {Text, View} from "react-native";
import styles from "../../styles/FichaClinica/FichaClinicaStyles";
import {typography} from "../../styles/typography";

type FichaClinicaListItemProp = {
    ficha: FichaClinica;
}

type CampoFichaClinicaProp = {
    titulo: string;
    cuerpo: string;
}

const CampoFichaClinica = ({ titulo, cuerpo }: CampoFichaClinicaProp) => {
    return (
      <Text>
          {titulo ? 
          <Text style={[typography.headline, styles.fichaItemTitle]}>{titulo}: </Text>
          : null}
          <Text style={[typography.body, styles.fichaItemBody]}>{cuerpo}</Text>
      </Text>
    );
}

export const FichaClinicaListItem = ({ ficha }: FichaClinicaListItemProp) => {
    return (
        <View style={styles.fichaItem}>
            <View style={{display: "flex", flexDirection: "row" , justifyContent: "flex-end"}}>
                <Text style={[{...typography.body, fontSize: 12}, styles.fichaItemBody, ]}>{ficha.fechaHora}</Text>
            </View>
            <CampoFichaClinica titulo={"Empleado"} cuerpo={ficha.idEmpleado.nombreCompleto}/>
            <CampoFichaClinica titulo={"Cliente"} cuerpo={ficha.idCliente.nombreCompleto}/>
            <CampoFichaClinica titulo={"Categoría"} cuerpo={ficha.idTipoProducto.idCategoria.descripcion}/>
            <CampoFichaClinica titulo={"Subcategoría"} cuerpo={ficha.idTipoProducto.descripcion}/>
        </View>
    );
};
