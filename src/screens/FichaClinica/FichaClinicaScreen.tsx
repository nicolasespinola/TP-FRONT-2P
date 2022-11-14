import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import colors from "../../styles/colors";
import {Text, TouchableOpacity, View} from "react-native";
import {typography} from "../../styles/typography";
import {BotonCerrarSesion} from "../BotonCerrarSesion";
import styles from "../../styles/FichaClinica/FichaClinicaStyles";
import {FichaClinica, FichaClinicaEjemplo} from "../../models/FichaClinica";
import {obtenerFichaClinica, obtenerFichasClinicas} from "../../api/fichaClinicaApi";
import {FichaClinicaList} from "./FichaClinicaList";
import LoadingScreen from "../LoadingScreen";
import {FichaClinicaModal} from "./FichaClinicaModal";
import {FichaClinicaFiltrosModal} from "./FichaClinicaFiltrosModal";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {FichaClinicaAgregarModal} from "./FichaClinicaAgregarModal";
import Header from "../../components/Header";

export const FichaClinicaScreen = () => {
    const {logout} = useContext(AuthContext);
    const [fichas, setFichas] = useState([] as FichaClinica[]);
    const [cargando, setCargando] = useState(true);
    const [mostrarFicha, setMostrarFicha] = useState({
        mostrar: false,
        ficha: undefined
    } as MostrarFichaOptions);
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [mostrarAgregar, setMostrarAgregar] = useState(false);

    useEffect(() => {
        // Obtener las fichas
        obtenerFichasClinicas()
            .then(value => {
                setFichas(value);
                setCargando(false);
            })
    }, []);

    // Cuando carga, es mejor avisar al usuario
    if (cargando) return <LoadingScreen/>;

    // Funciones auxiliares
    const seleccionarFicha = (ficha: FichaClinica) => {
        setMostrarFicha({
            mostrar: true,
            ficha: ficha
        });
    };

    const ocultarFicha = () => {
        setMostrarFicha({
            mostrar: false,
            ficha: undefined
        });
    };

    const abrirFiltros = () => {
        setMostrarFiltros(true);
    };

    const ocultarFiltros = () => {
        setMostrarFiltros(false);
    };

    const filtrarFichas = (filtro: FichaClinicaEjemplo) => {
        //console.log(filtro);
        obtenerFichaClinica(filtro)
            .then(value => {
                setFichas(value);
                setMostrarFiltros(false);
            });
    };

    const ocultarAgregar = () => {
        setMostrarAgregar(false);
    }

    return (
        <View style={styles.screen}>
            {/* Modales */}
            <FichaClinicaModal mostrarModal={mostrarFicha.mostrar}
                               cerrarModal={ocultarFicha}
                               fichaSeleccionada={mostrarFicha.ficha}/>
            <FichaClinicaFiltrosModal mostrar={mostrarFiltros}
                                      onFiltrar={filtrarFichas}
                                      cerrarModal={ocultarFiltros}/>
            <FichaClinicaAgregarModal mostrarModal={mostrarAgregar} cerrarModal={ocultarAgregar}/>
            {/* Header */}
            <Header text="Fichas"/>
            {/* Contenido */}
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 20,
                    justifyContent: "center",
                }}>
                    <BotonFiltrar onPress={abrirFiltros}/>
                    <BotonLimpiar onPress={()=>filtrarFichas({})}/>
                    <BotonAgregar onPress={()=> setMostrarAgregar(true)}/>
                </View>
                <FichaClinicaList fichas={fichas} onSeleccionar={seleccionarFicha}/>
            
        </View>
    );
};

type MostrarFichaOptions = {
    mostrar: boolean;
    ficha?: FichaClinica;
};

type BotonProps = {
    onPress: () => void
};

const BotonFiltrar = ({ onPress }: BotonProps) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: colors.secondary,
                paddingVertical: 5,
                paddingHorizontal: 15,
                borderRadius: 30,
                marginRight: 10,
            }}
            onPress={onPress}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Ionicons
                    name="filter"
                    size={16}
                    color={colors.white}
                    style={{ marginRight: 10 }}
                />
                <Text
                    style={[
                        typography.subhead,
                        { color: colors.white },
                    ]}
                >
                    Filtros
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const BotonAgregar = ({ onPress}: BotonProps) => {
    return(
        <TouchableOpacity
            style={{
                backgroundColor: colors.primary,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 30,
                alignItems: "center",
            }}
            onPress={onPress}
        >
            <View style={{ display: "flex", flexDirection: "row" }}>
                <MaterialIcons
                    name="add"
                    size={24}
                    color={colors.white}
                    style={{ marginRight: 5 }}
                />
                <Text
                    style={[
                        typography.subhead,
                        { color: colors.white },
                    ]}
                >
                    Agregar
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const BotonLimpiar = ({onPress}: BotonProps) => {
    return(
        <TouchableOpacity
            style={{
                backgroundColor: "#0177FB",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 30,
                marginRight: 10,
            }}
            onPress={onPress}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <MaterialIcons
                    name="clear"
                    size={16}
                    color={colors.white}
                    style={{ marginRight: 5 }}
                />
                <Text
                    style={[
                        typography.subhead,
                        { color: colors.white },
                    ]}
                >
                    Limpiar
                </Text>
            </View>
        </TouchableOpacity>
    );
};
