import React, {useEffect, useState} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Text, ScrollView
} from "react-native";
import {FichaClinica} from "../../models/FichaClinica";
import colors from "../../styles/colors";
import {Ionicons} from "@expo/vector-icons";
import {typography} from "../../styles/typography";
import {CampoFormulario} from "./CampoFormulario";
import {modificarFichaClinica} from "../../api/fichaClinicaApi";

type FichaClinicaModalProps = {
    mostrarModal: boolean;
    fichaSeleccionada?: FichaClinica;
    cerrarModal: () => void
}

export const FichaClinicaModal = ({mostrarModal = false, fichaSeleccionada, cerrarModal}: FichaClinicaModalProps) => {
    const [ficha, setFicha] = useState(fichaSeleccionada);

    useEffect(()=>{
        setFicha(fichaSeleccionada);
    }, [fichaSeleccionada]);

    const actualizarCampo = (campo: string) => (valor: string) => {
        setFicha({...ficha, [campo]: valor});
    }

    const modificarFicha = () => {
        modificarFichaClinica({
            idFichaClinica: ficha.idFichaClinica,
            observacion: ficha.observacion
        })
            .then(() => {
               cerrarModal();
            });
    }

    return (
        <KeyboardAvoidingView>
            <Modal animationType="slide" transparent={true} visible={mostrarModal}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={estilos.contenedor}>
                        <View style={estilos.borde}/>
                        <View style={estilos.modal}>
                            {/* Botón de cerrar */}
                            <View style={estilos.contenedorBotones}>
                                <TouchableOpacity onPress={cerrarModal}>
                                    <Ionicons
                                        name="close"
                                        size={24}
                                        color={colors.white}
                                    />
                                </TouchableOpacity>
                            </View>
                            {/* Header */}
                            <Text style={[typography.headline, { color: colors.white, marginBottom: 20 }]}>
                                Datos de la Ficha Clínica
                            </Text>
                            {/* Campos */}
                            <ScrollView style={{maxHeight: "80%"}}>
                                <CampoFormulario texto="Observación" valor={ficha?.observacion ?? ""}
                                                 onChange={actualizarCampo("observacion")}/>
                            </ScrollView>
                            {/* Botones */}
                            <View style={estilos.contenedorBotones}>
                                <TouchableOpacity style={estilos.botonPrimario} onPress={modificarFicha}>
                                    <Text style={[typography.subhead, { color: colors.white },]}>
                                        Modificar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    borde: {
        backgroundColor: colors.primary,
        width: "80%",
        height: 300,
        borderRadius: 20,
    },
    modal: {
        backgroundColor: "#1F1F3C",
        width: "90%",
        borderRadius: 25,
        position: "absolute",
        marginTop: "auto",
        marginBottom: "auto",
        paddingTop: 20,
        paddingBottom: 0,
        paddingHorizontal: 30,
        //height: "70%",
    },
    contenedorBotones: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    botonPrimario: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 20,
        borderRadius: 30,
        marginRight: 10,
    },
    botonSecundario: {
        borderWidth: 2,
        borderColor: colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 20,
        borderRadius: 30,
    },
});
