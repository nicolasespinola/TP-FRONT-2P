import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "../styles/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "../styles/typography";
import { profileModal } from "../styles/styles";
import moment from "moment";
import { obtenerEmpleados } from "../api/reservaApi";
import { getPacientes } from "../api/patientApi";
import { set } from "react-native-reanimated";

const ReservaFilterModal = ({
    showFilterModal,
    setShowFilterModal,
    updateListaReservas,
}) => {
    const [inputData, setInputData] = useState({
        fechaDesde: "",
        fechaHasta: "",
        empleado: "",
        cliente: "",
    });
    const [dateDesde, setDateDesde] = useState(new Date());
    const [dateHasta, setDateHasta] = useState(new Date());
    const [showPicker1, setShowPicker1] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);

    const [empleados, setEmpleados] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [filtroEmpleado, setFiltroEmpleado] = useState(undefined);
    const [filtroCliente, setFiltroCliente] = useState(undefined);

    useEffect(() => {
        const fetchPacientes = async () => {
            const response = await getPacientes({});
            setClientes(response?.lista);
            //setLoading(false);
        };
        const fetchEmpleados = async () => {
            const response = await obtenerEmpleados();
            setEmpleados(response?.lista);
            //setLoading(false)
        };
        fetchPacientes();
        fetchEmpleados();
        //console.log(clientes)
    }, []);

    const updateField = (field, value) => {
        setInputData({ ...inputData, [field]: value });
    };

    const handleDateDesde = (selectedDate1) => {
        const currentDateDesde = selectedDate1 || dateDesde;
        setDateDesde(currentDateDesde);
        updateField("fechaDesde", currentDateDesde);
    };

    const handleDateHasta = (selectedDate2) => {
        const currentDateHasta = selectedDate2 || dateHasta;
        setDateHasta(currentDateHasta);
        updateField("fechaHasta", currentDateHasta);
    };

    const handleSubmit = async () => {
        try {
            //console.log(JSON.stringify(inputData));
            setInputData({
                fechaDesde: "",
                fechaHasta: "",
                empleado: "",
                cliente: "",
            });
            await updateListaReservas(inputData);
            setShowFilterModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showFilterModal}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={profileModal.container}>
                        <View
                            style={{ ...profileModal.border, height: 370 }}
                        ></View>
                        <View
                            style={{
                                ...profileModal.modal,
                                paddingBottom: 20,
                                maxHeight: "100%",
                            }}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => setShowFilterModal(false)}
                                >
                                    <Ionicons
                                        name="close"
                                        size={24}
                                        color={colors.white}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text
                                style={[
                                    typography.headline,
                                    { color: colors.white, marginBottom: 20 },
                                ]}
                            >
                                Filtrar
                            </Text>
                            <View>
                                <Text
                                    style={[
                                        typography.body,
                                        {
                                            color: colors.white,
                                            marginBottom: 5,
                                        },
                                    ]}
                                >
                                    Fecha Desde
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setShowPicker1(true)}
                                    style={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderColor: "#38385F",
                                        borderRadius: 5,
                                        backgroundColor: "#2A2A47",
                                        paddingHorizontal: 10,
                                        paddingVertical: 8,
                                        color: colors.white,
                                    }}
                                >
                                    <Text
                                        style={[
                                            typography.body,
                                            { color: colors.white },
                                        ]}
                                    >
                                        {`${dateDesde?.getDate()}/${
                                            dateDesde?.getMonth() + 1
                                        }/${dateDesde?.getFullYear()}`}
                                    </Text>
                                </TouchableOpacity>
                                {showPicker1 ? (
                                    <DateTimePicker
                                        value={dateDesde}
                                        mode="date"
                                        display="default"
                                        onChange={(event, selectedDate1) => {
                                            handleDateDesde(selectedDate1);
                                            setShowPicker1(false);
                                        }}
                                    />
                                ) : null}
                            </View>
                            <View>
                                <Text
                                    style={[
                                        typography.body,
                                        {
                                            color: colors.white,
                                            marginBottom: 5,
                                        },
                                    ]}
                                >
                                    Fecha Hasta
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setShowPicker2(true)}
                                    style={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderColor: "#38385F",
                                        borderRadius: 5,
                                        backgroundColor: "#2A2A47",
                                        paddingHorizontal: 10,
                                        paddingVertical: 8,
                                        color: colors.white,
                                    }}
                                >
                                    <Text
                                        style={[
                                            typography.body,
                                            { color: colors.white },
                                        ]}
                                    >
                                        {`${dateHasta?.getDate()}/${
                                            dateHasta?.getMonth() + 1
                                        }/${dateHasta?.getFullYear()}`}
                                    </Text>
                                </TouchableOpacity>
                                {showPicker2 ? (
                                    <DateTimePicker
                                        value={dateHasta}
                                        mode="date"
                                        display="default"
                                        onChange={(event, selectedDate2) => {
                                            handleDateHasta(selectedDate2);
                                            setShowPicker2(false);
                                        }}
                                    />
                                ) : null}
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text
                                    style={{
                                        ...typography.body,
                                        color: colors.white,
                                        marginBottom: 10,
                                    }}
                                >
                                    Empleado
                                </Text>
                                <Picker
                                    selectedValue={inputData.empleado}
                                    dropdownIconColor={colors.white}
                                    style={{
                                        color: colors.white,
                                        backgroundColor: "#2A2A47",
                                    }}
                                    onValueChange={(itemValue) => {
                                        updateField("empleado", itemValue);
                                    }}
                                >
                                    <Picker.Item
                                        key={undefined}
                                        label="No filtrar"
                                    />
                                    {empleados.map((persona) => (
                                        <Picker.Item
                                            key={persona.idPersona}
                                            label={persona.nombreCompleto}
                                            value={persona.idPersona}
                                        />
                                    ))}
                                </Picker>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text
                                    style={{
                                        ...typography.body,
                                        color: colors.white,
                                        marginBottom: 10,
                                    }}
                                >
                                    Clientes
                                </Text>
                                <Picker
                                    selectedValue={inputData.cliente}
                                    dropdownIconColor={colors.white}
                                    style={{
                                        color: colors.white,
                                        backgroundColor: "#2A2A47",
                                    }}
                                    onValueChange={(itemValue) => {
                                        updateField("cliente", itemValue);
                                    }}
                                >
                                    <Picker.Item
                                        key={undefined}
                                        label="No filtrar"
                                    />
                                    {clientes.map((persona) => (
                                        <Picker.Item
                                            key={persona.idPersona}
                                            label={persona.nombreCompleto}
                                            value={persona.idPersona}
                                        />
                                    ))}
                                </Picker>
                            </View>
                            <View style={profileModal.buttonsContainer}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: colors.primary,
                                        paddingVertical: 10,
                                        paddingHorizontal: 30,
                                        marginVertical: 20,
                                        borderRadius: 30,
                                        marginRight: 10,
                                    }}
                                    onPress={handleSubmit}
                                >
                                    <Text
                                        style={[
                                            typography.subhead,
                                            { color: colors.white },
                                        ]}
                                    >
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

export default ReservaFilterModal;
