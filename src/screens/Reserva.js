import React, { useState, useEffect, useCallback } from "react";
import {
    KeyboardAvoidingView,
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "../styles/typography";
import colors from "../styles/colors";
import Card from "../components/Card";
import { getReservas, getReservasPrueba } from "../api/reservaApi";
import LoadingScreen from "./LoadingScreen";
import Header from "../components/Header";
import ReservaFilterModal from "../components/ReservaFilterModal";
import ReservaModal from "../components/ReservaModal";

export const Reserva = ({ navigation }) => {
    const [inputData, setInputData] = useState({
        fechaDesde: "",
        fechaHasta: "",
        empleado: "",
        cliente: "",
    });
    const [listaReservas, setListaReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showReservaModal, setShowReservaModal] = useState(false);
    const [selectedReserva, setSelectedReserva] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [create, setCreate] = useState(null);

    const filtrar = async (data) => {
        const response = await getReservas(data);
        setListaReservas(response.lista);
        setLoading(false);
    };

    const limpiar = async () => {
        const response = await getReservas({});
        setListaReservas(response.lista);
        setLoading(false);
    };

    const updateFields = (field, value) => {
        setInputData({ ...inputData, [field]: value });
    };

    useFocusEffect(
        useCallback(() => {
            limpiar();
        }, [])
    );

    const updateListaReservas = async (data) => {
        setLoading(true);
        const response = await getReservas(data);
        setListaReservas(response.lista);
        setLoading(false);
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 32,
                backgroundColor: colors.neutral1,
            }}
        >
            <ReservaFilterModal
                showFilterModal={showFilterModal}
                setShowFilterModal={setShowFilterModal}
                updateListaReservas={updateListaReservas}
            />
            <ReservaModal
                showReservaModal={showReservaModal}
                setShowReservaModal={setShowReservaModal}
                selectedReserva={selectedReserva}
                updateListaReservas={updateListaReservas}
                create={create}
            />
            <Header text="Reservas" />
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 20,
                    justifyContent: "flex-end",
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.secondary,
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        borderRadius: 30,
                        marginRight: 10,
                    }}
                    onPress={() => setShowFilterModal(true)}
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
                <TouchableOpacity
                    style={{
                        backgroundColor: "#0177FB",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 30,
                        marginRight: 10,
                    }}
                    onPress={() => limpiar()}
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
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.primary,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 30,
                        alignItems: "center",
                    }}
                    onPress={() => {
                        navigation.navigate("Create Reserva");
                    }}
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
            </View>
            <FlatList
                data={listaReservas}
                keyExtractor={(item) => {
                    return item.idReserva;
                }}
                renderItem={(item) => {
                    return (
                        <Card
                            item={item}
                            setShowReservaModal={setShowReservaModal}
                            setSelectedReserva={setSelectedReserva}
                            setCreate={setCreate}
                        ></Card>
                    );
                }}
            ></FlatList>
        </View>
    );
};

export default Reserva;
