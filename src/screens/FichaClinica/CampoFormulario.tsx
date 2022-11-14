import React from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import colors from "../../styles/colors";
import {typography} from "../../styles/typography";

type CampoFormularioProps = {
    texto: string;
    valor: string;
    onChange: (valor: string) => void;
}

export const CampoFormulario = ({texto, valor, onChange}: CampoFormularioProps) => {
    return (
        <View style={{marginBottom: 10}}>
            <Text style={[typography.body, estilos.texto]}>{texto}</Text>
            <TextInput style={[typography.body, estilos.input]} value={valor} onChangeText={onChange}/>
        </View>
    );
};

const estilos = StyleSheet.create({
    texto: {
        color: colors.white,
        marginBottom: 5,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#38385F",
        borderRadius: 5,
        backgroundColor: "#2A2A47",
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: colors.white,
    },
});

