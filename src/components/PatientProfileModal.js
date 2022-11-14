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
    Alert,
} from "react-native";
import colors from "../styles/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "../styles/typography";
import { profileModal } from "../styles/styles";
import moment from "moment";
import { deletePatient, postPaciente, updatePatient } from "../api/patientApi";

const PatientProfileModal = ({
    showProfileModal,
    setShowProfileModal,
    selectedPatient,
    updatePatientList,
    create,
}) => {
    const [patient, setPatient] = useState(selectedPatient);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const updateField = (field, value) => {
        setPatient({ ...patient, [field]: value });
    };

    const handleDate = (selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setPatient({ ...patient, fechaNacimiento: currentDate });
    };

    useEffect(() => {
        let newDate = moment(selectedPatient?.fechaNacimiento).toDate();
        setDate(newDate);
        setPatient(selectedPatient);
    }, [selectedPatient]);

    const handleSubmit = async () => {
        try {
            if (create) {
                const response = await postPaciente({
                    ...patient,
                    fechaNacimiento: date,
                });
            } else {
                const response = await updatePatient(patient);
            }
            await updatePatientList({});
            setShowProfileModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deletePatient(patient.idPersona);
            await updatePatientList({});
            setShowProfileModal(false);
        } catch (error) {
            const err = error.response.data;
            Alert.alert("Error", err, [
                {
                    text: "Aceptar",
                },
            ]);
        }
    };

    return (
        <KeyboardAvoidingView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showProfileModal}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={profileModal.container}>
                        <View style={profileModal.border}></View>
                        <View style={profileModal.modal}>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => setShowProfileModal(false)}
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
                                Datos del paciente
                            </Text>
                            <ScrollView style={{ maxHeight: "80%" }}>
                                <View style={{ marginBottom: 10 }}>
                                    <Text
                                        style={[
                                            typography.body,
                                            {
                                                color: colors.white,
                                                marginBottom: 5,
                                            },
                                        ]}
                                    >
                                        Nombre
                                    </Text>
                                    <TextInput
                                        style={[
                                            profileModal.textInput,
                                            typography.body,
                                        ]}
                                        value={patient?.nombre}
                                        onChangeText={(text) =>
                                            updateField("nombre", text)
                                        }
                                    />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text
                                        style={[
                                            typography.body,
                                            {
                                                color: colors.white,
                                                marginBottom: 5,
                                            },
                                        ]}
                                    >
                                        Apellido
                                    </Text>
                                    <TextInput
                                        style={[
                                            profileModal.textInput,
                                            typography.body,
                                        ]}
                                        value={patient?.apellido}
                                        onChangeText={(text) =>
                                            updateField("apellido", text)
                                        }
                                    />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text
                                        style={[
                                            typography.body,
                                            {
                                                color: colors.white,
                                                marginBottom: 5,
                                            },
                                        ]}
                                    >
                                        Teléfono
                                    </Text>
                                    <TextInput
                                        style={[
                                            profileModal.textInput,
                                            typography.body,
                                        ]}
                                        value={patient?.telefono}
                                        onChangeText={(text) =>
                                            updateField("telefono", text)
                                        }
                                    />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text
                                        style={[
                                            typography.body,
                                            {
                                                color: colors.white,
                                                marginBottom: 5,
                                            },
                                        ]}
                                    >
                                        Email
                                    </Text>
                                    <TextInput
                                        style={[
                                            profileModal.textInput,
                                            typography.body,
                                        ]}
                                        value={patient?.email}
                                        onChangeText={(text) =>
                                            updateField("email", text)
                                        }
                                    />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text
                                        style={[
                                            typography.body,
                                            {
                                                color: colors.white,
                                                marginBottom: 5,
                                            },
                                        ]}
                                    >
                                        Cédula
                                    </Text>
                                    <TextInput
                                        style={[
                                            profileModal.textInput,
                                            typography.body,
                                        ]}
                                        value={patient?.cedula}
                                        onChangeText={(text) =>
                                            updateField("cedula", text)
                                        }
                                    />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text
                                        style={[
                                            typography.body,
                                            {
                                                color: colors.white,
                                                marginBottom: 5,
                                            },
                                        ]}
                                    >
                                        RUC
                                    </Text>
                                    <TextInput
                                        style={[
                                            profileModal.textInput,
                                            typography.body,
                                        ]}
                                        value={patient?.ruc}
                                        onChangeText={(text) =>
                                            updateField("ruc", text)
                                        }
                                    />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text
                                        style={[
                                            typography.body,
                                            {
                                                color: colors.white,
                                                marginBottom: 5,
                                            },
                                        ]}
                                    >
                                        Tipo Persona
                                    </Text>
                                    <TextInput
                                        style={[
                                            profileModal.textInput,
                                            typography.body,
                                        ]}
                                        value={patient?.tipoPersona}
                                        onChangeText={(text) =>
                                            updateField("tipoPersona", text)
                                        }
                                    />
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
                                        Fecha de nacimiento
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setShowPicker(true)}
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
                            </ScrollView>
                            <View style={profileModal.buttonsContainer}>
                                <TouchableOpacity
                                    style={profileModal.primaryButton}
                                    onPress={handleSubmit}
                                >
                                    <Text
                                        style={[
                                            typography.subhead,
                                            { color: colors.white },
                                        ]}
                                    >
                                        Guardar
                                    </Text>
                                </TouchableOpacity>
                                {!create ? (
                                    <TouchableOpacity
                                        style={profileModal.secondaryButton}
                                        onPress={handleDelete}
                                    >
                                        <Text
                                            style={[
                                                typography.subhead,
                                                { color: colors.white },
                                            ]}
                                        >
                                            Eliminar
                                        </Text>
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default PatientProfileModal;
