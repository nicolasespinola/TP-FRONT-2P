import React, {useEffect, useState} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal, ScrollView, StyleSheet, Switch, SwitchChangeEvent,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {FichaClinica, FichaClinicaEjemplo} from "../../models/FichaClinica";
import {Ionicons} from "@expo/vector-icons";
import colors from "../../styles/colors";
import {typography} from "../../styles/typography";
import DateTimePicker from '@react-native-community/datetimepicker';
import dateFormat from "dateformat";
import {Picker} from "@react-native-picker/picker";
import {Persona} from "../../models/Persona";
import {obtenerCategoria, obtenerClientes, obtenerEmpleados, obtenerTipoProducto} from "../../api/fichaClinicaApi";
import {Categoria} from "../../models/Categoria";
import {TipoProducto} from "../../models/TipoProducto";

type FichaClinicaFiltrosModalProps = {
    mostrar: boolean;
    onFiltrar: (ejemplo: FichaClinicaEjemplo) => void;
    cerrarModal: () => void;
}

export const FichaClinicaFiltrosModal = ({mostrar, onFiltrar, cerrarModal}: FichaClinicaFiltrosModalProps) => {
    const [filtrarFecha, setFiltrarFecha] = useState(false);
    const [fechas, setFechas] = useState({
        mostrarDesde: false,
        desde: new Date(),
        hasta: new Date(),
        mostrarHasta: false,
    });
    const [empleados, setEmpleados] = useState([] as Persona[]);
    const [clientes, setClientes] = useState([] as Persona[]);
    const [categorias, setCategorias] = useState([] as Categoria[]);
    const [tipoProductos, setTipoProductos] = useState([] as TipoProducto[]);
    const [filtroEmpleado, setFiltroEmpleado] = useState(undefined as (undefined | number));
    const [filtroCliente, setFiltroCliente] = useState(undefined as (undefined | number));
    const [filtroCategoria, setFiltroCategoria] = useState(undefined as (undefined | number));
    const [filtroTipoProducto, setFiltroTipoProducto] = useState(undefined as (undefined | number));

    useEffect(() => {
        obtenerEmpleados().then( valor => setEmpleados(valor));
        obtenerClientes().then( valor => setClientes(valor));
        obtenerCategoria().then( valor => setCategorias(valor));
    }, []);

    const handleFecha = (event: SwitchChangeEvent) => {
        setFiltrarFecha(prevState => !prevState)
    }

    const setFechaDesde = (_, fecha?: Date) => {
        setFechas(prevState => ({
            ...prevState,
            desde: fecha || prevState.desde,
            mostrarDesde: false
        }));
    };

    const setFechaHasta = (_, fecha?: Date) => {
        setFechas(prevState => ({
            ...prevState,
            hasta: fecha || prevState.hasta,
            mostrarHasta: false
        }));
    };

    const filtrar = () => {
        onFiltrar({
            fechaDesdeCadena: filtrarFecha ? dateFormat(fechas.desde, "yyyymmdd") : undefined,
            fechaHastaCadena: filtrarFecha ? dateFormat(fechas.hasta, "yyyymmdd"): undefined,
            idEmpleado: {
                idPersona: filtroEmpleado
            },
            idCliente: {
                idPersona: filtroCliente
            },
            idTipoProducto: {
                idTipoProducto: filtroTipoProducto
            }
        });
    };

    return (
        <KeyboardAvoidingView>
            <Modal animationType="slide" transparent={true} visible={mostrar}>
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
                            <Text style={[typography.title2, {color: colors.white, marginBottom: 20}]}>
                                Filtrar Fichas
                            </Text>
                            {/* Campos */}
                            <ScrollView style={{maxHeight: "80%"}}>
                                {/* Empleados */}
                                <View style={{marginBottom: 20}}>
                                    <Text style={{...typography.headline, color: colors.white, marginBottom: 10}}>Empleado</Text>
                                    <Picker selectedValue={filtroEmpleado} dropdownIconColor={colors.white} style={{color: colors.white, backgroundColor: "#2A2A47"}} onValueChange={(itemValue) => {
                                        setFiltroEmpleado(itemValue);
                                    }}>
                                        <Picker.Item key={undefined} label="No filtrar"/>
                                        {empleados.map( persona =>
                                            (<Picker.Item key={persona.idPersona} label={persona.nombreCompleto} value={persona.idPersona}/>)
                                        )}
                                    </Picker>
                                </View>
                                {/* Clientes */}
                                <View style={{marginBottom: 20}}>
                                    <Text style={{...typography.headline, color: colors.white, marginBottom: 10}}>Clientes</Text>
                                    <Picker selectedValue={filtroCliente} dropdownIconColor={colors.white} style={{color: colors.white, backgroundColor: "#2A2A47"}} onValueChange={(itemValue) => {
                                        setFiltroCliente(itemValue);
                                    }}>
                                        <Picker.Item key={undefined} label="No filtrar"/>
                                        {clientes.map( persona =>
                                            (<Picker.Item key={persona.idPersona} label={persona.nombreCompleto} value={persona.idPersona}/>)
                                        )}
                                    </Picker>
                                </View>
                                {/* Categoria */}
                                <View style={{marginBottom: 20}}>
                                    <Text style={{...typography.headline, color: colors.white, marginBottom: 10}}>Categoría</Text>
                                    <Picker selectedValue={filtroCategoria} dropdownIconColor={colors.white} style={{color: colors.white, backgroundColor: "#2A2A47"}} onValueChange={(itemValue) => {
                                        setFiltroCategoria(itemValue);
                                        obtenerTipoProducto(itemValue).then( tipos => setTipoProductos(tipos) )
                                    }}>
                                        <Picker.Item key={undefined} label="No filtrar"/>
                                        {categorias.map( categoria =>
                                            (<Picker.Item key={categoria.idCategoria} label={categoria.descripcion} value={categoria.idCategoria}/>)
                                        )}
                                    </Picker>
                                </View>
                                {/* Subcategoría */}
                                <View style={{marginBottom: 20}}>
                                    <Text style={{...typography.headline, color: colors.white, marginBottom: 10}}>Subcategoría</Text>
                                    <Picker selectedValue={filtroTipoProducto} dropdownIconColor={colors.white} style={{color: colors.white, backgroundColor: "#2A2A47"}} onValueChange={(itemValue) => {
                                        setFiltroTipoProducto(itemValue);
                                    }}>
                                        <Picker.Item key={undefined} label="No filtrar"/>
                                        {tipoProductos.map( tipoProducto =>
                                            (<Picker.Item key={tipoProducto.idTipoProducto} label={tipoProducto.descripcion} value={tipoProducto.idTipoProducto}/>)
                                        )}
                                    </Picker>
                                </View>
                                {/* Fechas */}
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10}}>
                                    <Text style={{...typography.headline, color: colors.white,}}>Filtrar por Fecha</Text>
                                    <Switch value={filtrarFecha} onChange={handleFecha}/>
                                </View>
                                {filtrarFecha &&
                                <View>
                                    <Text style={[typography.headline, {
                                        color: colors.white,
                                        marginVertical: 10
                                    }]}>Desde: </Text>
                                    <TouchableOpacity
                                        onPress={() => setFechas(prev => ({
                                            ...prev,
                                            mostrarDesde: true
                                        }))}
                                        style={{
                                            flex: 1,
                                            borderWidth: 1,
                                            borderColor: "#38385F",
                                            borderRadius: 5,
                                            backgroundColor: "#2A2A47",
                                            paddingHorizontal: 10,
                                            paddingVertical: 10,
                                        }}
                                    >
                                        <Text
                                            style={[
                                                typography.body,
                                                { color: colors.white },
                                            ]}
                                        >
                                            {`${fechas.desde?.getDate()}/${
                                                fechas.desde?.getMonth() + 1
                                            }/${fechas.desde?.getFullYear()}`}
                                        </Text>
                                    </TouchableOpacity>
                                    {fechas.mostrarDesde &&
                                        <DateTimePicker value={fechas.desde} onChange={setFechaDesde} mode="date" display="default"/>
                                    }
                                    <Text style={[typography.headline, {
                                        color: colors.white,
                                        marginVertical: 10
                                    }]}>Hasta: </Text>
                                    <TouchableOpacity
                                        onPress={() => setFechas(prev => ({
                                            ...prev,
                                            mostrarHasta: true
                                        }))}
                                        style={{
                                            flex: 1,
                                            borderWidth: 1,
                                            borderColor: "#38385F",
                                            borderRadius: 5,
                                            backgroundColor: "#2A2A47",
                                            paddingHorizontal: 10,
                                            paddingVertical: 10,
                                        }}
                                    >
                                        <Text
                                            style={[
                                                typography.body,
                                                { color: colors.white },
                                            ]}
                                        >
                                            {`${fechas.hasta?.getDate()}/${
                                                fechas.hasta?.getMonth() + 1
                                            }/${fechas.hasta?.getFullYear()}`}
                                        </Text>
                                    </TouchableOpacity>
                                    {fechas.mostrarHasta &&
                                        <DateTimePicker value={fechas.hasta} onChange={setFechaHasta} mode="date" display="default"

                                        />
                                    }
                                </View>
                                }
                            </ScrollView>
                            {/* Botones */}
                            <View style={estilos.contenedorBotones}>
                                <TouchableOpacity style={estilos.botonPrimario} onPress={filtrar}>
                                    <Text style={[typography.subhead, {color: colors.white},]}>
                                        Filtrar
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
        height: 550,
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
    botonSecundario: {
        borderWidth: 2,
        borderColor: colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 20,
        borderRadius: 30,
    },
});
