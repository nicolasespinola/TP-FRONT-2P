import React from "react";
import {FichaClinica} from "../../models/FichaClinica";
import {FlatList, TouchableOpacity} from "react-native";
import {FichaClinicaListItem} from "./FichaClinicaListItem";
import styles from "../../styles/FichaClinica/FichaClinicaStyles";

type FichaClinicaListProps = {
    fichas: FichaClinica[];
    onSeleccionar: (ficha: FichaClinica) => void;
}

export const FichaClinicaList = ({fichas, onSeleccionar}: FichaClinicaListProps) => {
    return (
        <FlatList data={fichas}
                  renderItem={({item}) => (
                      <TouchableOpacity onPress={() => onSeleccionar(item)}>
                          <FichaClinicaListItem key={item.idFichaClinica} ficha={item}/>
                      </TouchableOpacity>
                  )}
                  style={styles.fichaList}
                  keyExtractor={(item, _) => `${item.idFichaClinica}`}/>
    );
};
