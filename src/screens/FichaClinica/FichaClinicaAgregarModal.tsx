import React, {useEffect, useState} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal, ScrollView,
    StyleSheet, Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import colors from "../../styles/colors";
import {Ionicons} from "@expo/vector-icons";
import {typography} from "../../styles/typography";
import {CampoFormulario} from "./CampoFormulario";
import {FichaClinica} from "../../models/FichaClinica";
import {Persona} from "../../models/Persona";
import {
    agregarFichaClinica,
    obtenerCategoria,
    obtenerClientes,
    obtenerEmpleados,
    obtenerTipoProducto
} from "../../api/fichaClinicaApi";
import {Picker} from "@react-native-picker/picker";
import {Categoria} from "../../models/Categoria";
import {TipoProducto} from "../../models/TipoProducto";

type FichaClinicaAgregarModalProps = {
    mostrarModal: boolean;
    cerrarModal: () => void;
}

export const FichaClinicaAgregarModal = ({mostrarModal, cerrarModal}: FichaClinicaAgregarModalProps) => {
    const [ficha, setFicha] = useState({
        motivoConsulta: "",
        observacion: "",
        diagnostico: "",
        idEmpleado: {idPersona: undefined},
        idCliente: {idPersona: undefined},
        idTipoProducto: {idTipoProducto: undefined}
    } as FichaClinica);

    const [empleados, setEmpleados] = useState([] as Persona[]);
    const [clientes, setClientes] = useState([] as Persona[]);
    const [categorias, setCategorias] = useState([] as Categoria[]);
    const [tipoProductos, setTipoProductos] = useState([] as TipoProducto[]);
    const [filtroCategoria, setFiltroCategoria] = useState(undefined as number);

    useEffect(() => {
        if (mostrarModal) {
            obtenerEmpleados().then(empleados => setEmpleados(empleados));
            obtenerClientes().then(clientes => setClientes(clientes));
            obtenerCategoria().then(categorias => setCategorias(categorias));
        }
    }, [mostrarModal]);

    const actualizarCampo = (campo: string) => (valor) => {
        setFicha({...ficha, [campo]: valor});
    }

    const crearFicha = () => {
        agregarFichaClinica(ficha)
            .then(cerrarModal);
    }

    const puedeAgregar =
        ficha.motivoConsulta !== ""
        && ficha.diagnostico !== ""
        && ficha.idEmpleado.idPersona !== undefined
        && ficha.idCliente.idPersona !== undefined
        && ficha.idTipoProducto.idTipoProducto !== undefined;

    return (
        <KeyboardAvoidingView>
            <Modal animationType="slide" transparent={true} visible={mostrarModal}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={estilos.contenedor}>
                        <View style={{...estilos.borde, height: 550}}/>
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
                            <Text style={[typography.title1, {color: colors.white, marginBottom: 20}]}>
                                Agregar Ficha Clínica
                            </Text>
                            {/* Campos */}
                            <ScrollView style={{maxHeight: "80%"}}>
                                {/* Motivo de consulta */}
                                <View>
                                    <CampoFormulario texto="Motivo de consulta" valor={ficha.motivoConsulta}
                                                     onChange={actualizarCampo("motivoConsulta")}/>
                                </View>
                                {/* Diagnostico */}
                                <View>
                                    <CampoFormulario texto="Diagnostico" valor={ficha.diagnostico}
                                                     onChange={actualizarCampo("diagnostico")}/>
                                </View>
                                {/* Observación */}
                                <View>
                                    <CampoFormulario texto="Observación" valor={ficha.observacion}
                                                     onChange={actualizarCampo("observacion")}/>
                                </View>
                                {/* Empleado */}
                                <View>
                                    <Text style={[typography.body, {color: colors.white}]}>Empleado</Text>
                                    <Picker style={{
                                        backgroundColor: "#2A2A47",
                                        color: colors.white,
                                    }}
                                            selectedValue={ficha.idEmpleado.idPersona}
                                            onValueChange={value => {
                                                setFicha(prev => ({
                                                    ...prev,
                                                    idEmpleado: {
                                                        idPersona: value
                                                    }
                                                } as FichaClinica));
                                            }}>
                                        <Picker.Item value={undefined} label="-- Seleccionar Empleado --"/>
                                        {empleados.map(persona => (
                                            <Picker.Item key={persona.idPersona} value={persona.idPersona}
                                                         label={persona.nombreCompleto}/>
                                        ))}
                                    </Picker>
                                </View>
                                {/* Cliente */}
                                <View>
                                    <Text style={[typography.body, {color: colors.white}]}>Cliente</Text>
                                    <Picker style={{
                                        backgroundColor: "#2A2A47",
                                        color: colors.white,
                                    }}
                                            selectedValue={ficha.idCliente.idPersona}
                                            onValueChange={value => {
                                                setFicha(prev => ({
                                                    ...prev,
                                                    idCliente: {
                                                        idPersona: value
                                                    }
                                                } as FichaClinica));
                                            }}>
                                        <Picker.Item value={undefined} label="-- Seleccionar Cliente --"/>
                                        {clientes.map(persona => (
                                            <Picker.Item key={persona.idPersona} value={persona.idPersona}
                                                         label={persona.nombreCompleto}/>
                                        ))}
                                    </Picker>
                                </View>
                                {/* Categoría */}
                                <View>
                                    <Text style={[typography.body, {color: colors.white}]}>Categoría</Text>
                                    <Picker style={{
                                        backgroundColor: "#2A2A47",
                                        color: colors.white,
                                    }}
                                            selectedValue={filtroCategoria}
                                            onValueChange={valor => {
                                                setFiltroCategoria(valor);
                                                if (valor) {
                                                    obtenerTipoProducto(valor).then(tipos => setTipoProductos(tipos));
                                                } else {
                                                    setTipoProductos([] as TipoProducto[]);
                                                }
                                            }}>
                                        <Picker.Item value={undefined} label="-- Seleccionar Categoría --"/>
                                        {
                                            categorias.map(cat => <Picker.Item key={cat.idCategoria}
                                                                               value={cat.idCategoria}
                                                                               label={cat.descripcion}/>)
                                        }
                                    </Picker>
                                </View>
                                {/* Tipo de Producto */}
                                <View>
                                    <Text style={[typography.body, {color: colors.white}]}>Subcategoría</Text>
                                    <Picker style={{
                                        backgroundColor: "#2A2A47",
                                        color: colors.white,
                                    }}
                                            selectedValue={ficha.idTipoProducto.idTipoProducto}
                                            onValueChange={value => {
                                                setFicha(prev => ({
                                                    ...prev,
                                                    idTipoProducto: {
                                                        idTipoProducto: value
                                                    }
                                                } as FichaClinica));
                                            }}>
                                        <Picker.Item value={undefined} label="-- Seleccionar Subcategoría --"/>
                                        {tipoProductos.map(tipo => (
                                            <Picker.Item key={tipo.idTipoProducto} value={tipo.idTipoProducto}
                                                         label={tipo.descripcion}/>
                                        ))}
                                    </Picker>
                                </View>
                            </ScrollView>
                            {/* Botones */}
                            <View style={estilos.contenedorBotones}>
                                <TouchableOpacity
                                    style={puedeAgregar ? estilos.botonPrimario : estilos.botonPrimarioApagado}
                                    onPress={crearFicha}
                                    disabled={!puedeAgregar}>
                                    <Text style={[typography.subhead, {color: colors.white}]}>
                                        Agregar
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
        height: 650,
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
        height: "70%",
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
    botonPrimarioApagado: {
        backgroundColor: "#434448",
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
