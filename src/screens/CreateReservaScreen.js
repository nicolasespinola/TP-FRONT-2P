import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import colors from "../styles/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "../styles/typography";
import { profileModal } from "../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { getPacientes } from "../api/patientApi";
import { getUsuariosDelSistema } from "../api/loginApi";
import { postReserva, getAgenda } from "../api/reservaApi";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthContext";

const CreateReservaScreen = ({ navigation }) => {
    const [doctor, setDoctor] = useState("");
    const [patient, setPatient] = useState("");
    const [date, setDate] = useState(new Date(Date.now()));
    const [reserva, setReserva] = useState(null);
    const [horarios, setHorarios] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [patientList, setPatientList] = useState([]);
    const [userList, setUserList] = useState([]);
    const { userData } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            setDoctor(userData);
            const agenda = await getAgenda({ doctor: userData, fecha: date });
            setHorarios(agenda);
            const patients = await getPacientes({});
            setPatientList(patients.lista);
            const users = await getUsuariosDelSistema({});
            setUserList(users.lista);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const agenda = await getAgenda({ doctor: userData, fecha: date });
            setHorarios(agenda);
        };
        fetchData();
    }, [doctor, date]);

    const handleDate = (selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const handleSubmit = async () => {
        try {
            const response = await postReserva({
                fechaCadena: reserva.fechaCadena,
                horaInicioCadena: reserva.horaInicioCadena,
                horaFinCadena: reserva.horaFinCadena,
                idEmpleado: {
                    idPersona: reserva.idEmpleado.idPersona,
                },
                idCliente: {
                    idPersona: patient.idPersona,
                },
            });
            //console.log(response);
            navigation.goBack(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 32,
                backgroundColor: colors.neutral1,
            }}
        >
            <Header text="Reservar" />
            <Text
                style={[
                    typography.headline,
                    { color: colors.white, marginBottom: 20 },
                ]}
            >
                Datos de la reserva
            </Text>
            <View style={{ marginBottom: 20 }}>
                <Text
                    style={{
                        ...typography.body,
                        color: colors.white,
                        marginBottom: 10,
                    }}
                >
                    Fisioterapeuta
                </Text>
                <Picker
                    selectedValue={doctor}
                    dropdownIconColor={colors.white}
                    style={{ color: colors.white, backgroundColor: "#2A2A47" }}
                    onValueChange={(itemValue) => {
                        setDoctor(itemValue);
                    }}
                >
                    {userList.map((persona) => (
                        <Picker.Item
                            key={persona.idPersona}
                            label={persona.nombreCompleto}
                            value={persona}
                        />
                    ))}
                </Picker>
            </View>
            <View style={{ marginBottom: 20 }}>
                <Text
                    style={{
                        ...typography.body,
                        color: colors.white,
                        marginBottom: 10,
                    }}
                >
                    Paciente
                </Text>
                <Picker
                    selectedValue={patient}
                    dropdownIconColor={colors.white}
                    style={{ color: colors.white, backgroundColor: "#2A2A47" }}
                    onValueChange={(itemValue) => {
                        setPatient(itemValue);
                    }}
                >
                    <Picker.Item
                        key={undefined}
                        label="Seleccione un Paciente"
                    />
                    {patientList.map((persona) => (
                        <Picker.Item
                            key={persona.idPersona}
                            label={persona.nombreCompleto}
                            value={persona}
                        />
                    ))}
                </Picker>
            </View>
            <View>
                <Text
                    style={[
                        typography.body,
                        {
                            color: colors.white,
                            marginBottom: 10,
                        },
                    ]}
                >
                    Fecha de Reserva
                </Text>
                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#38385F",
                        borderRadius: 5,
                        backgroundColor: "#2A2A47",
                        paddingHorizontal: 10,
                        marginBottom: 10,
                        paddingVertical: 8,
                        color: colors.white,
                    }}
                    onPress={() => setShowPicker(true)}
                >
                    <Text style={[typography.body, { color: colors.white }]}>
                        {" "}
                        {`${date?.getDate()}/${
                            date?.getMonth() + 1
                        }/${date?.getFullYear()}`}
                    </Text>
                </TouchableOpacity>
                {showPicker ? (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            handleDate(selectedDate);
                            setShowPicker(false);
                        }}
                    />
                ) : null}
            </View>
            <View style={{ marginBottom: 20 }}>
                <Text
                    style={{
                        ...typography.headline,
                        color: colors.white,
                        marginBottom: 10,
                    }}
                >
                    Horario
                </Text>
                <Picker
                    selectedValue={reserva}
                    dropdownIconColor={colors.white}
                    style={{ color: colors.white, backgroundColor: "#2A2A47" }}
                    onValueChange={(itemValue) => {
                        setReserva(itemValue);
                    }}
                >
                    <Picker.Item
                        key={undefined}
                        label="Seleccione un horario"
                    />
                    {horarios?.map((item) => (
                        <Picker.Item
                            key={item.horaInicioCadena}
                            label={
                                item.horaInicioCadena.substring(0, 2) +
                                ":" +
                                item.horaInicioCadena.substring(2) +
                                " - " +
                                item.horaFinCadena.substring(0, 2) +
                                ":" +
                                item.horaFinCadena.substring(2)
                            }
                            value={item}
                        />
                    ))}
                </Picker>
            </View>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 20,
                    justifyContent: "flex-start",
                }}
            >
                <TouchableOpacity
                    style={profileModal.primaryButton}
                    onPress={handleSubmit}
                >
                    <Text style={[typography.subhead, { color: colors.white }]}>
                        Guardar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={profileModal.secondaryButton}
                    onPress={() => {
                        navigation.goBack(null);
                    }}
                >
                    <Text style={[typography.subhead, { color: colors.white }]}>
                        Cancelar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CreateReservaScreen;
