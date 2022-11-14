import React, { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../contexts/AuthContext";
import { profileModal } from "../styles/styles";
import moment from "moment";
// import api calls
import { deleteReserva, updateReserva } from "../api/reservaApi";

const ReservaModal = ({
    showReservaModal,
    setShowReservaModal,
    selectedReserva,
    updateListaReservas,
    create,
}) => {
    const { userData } = useContext(AuthContext);

    const [reserva, setReserva] = useState(selectedReserva);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const handleCheckBox = () => {
        setToggleCheckBox(!toggleCheckBox);
        updateField("flagAsistio", toggleCheckBox);
    };

    const updateField = (field, value) => {
        setReserva({ ...reserva, [field]: value });
    };

    useEffect(() => {
        setReserva(selectedReserva);
        //reserva?.flagAsistio === "S" ? handleCheckBox : updateField("flagAsistio", toggleCheckBox)
    }, [selectedReserva]);

    const handleDelete = async () => {
        try {
            const response = await deleteReserva(reserva.idReserva, userData);
            await updateListaReservas({});
            setShowReservaModal(false);
        } catch (error) {
            const err = error.response.data;
            Alert.alert("Error", err, [
                {
                    text: "Aceptar",
                },
            ]);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await updateReserva(reserva, userData);
            await updateListaReservas({});
            setShowReservaModal(false);
        } catch (error) {
            const err = error.response.data;
            Alert.alert("Error", err, [
                {
                    text: "Aceptar",
                },
            ]);
        }
    };

    const pruebas = () => {
        //console.log(reserva)
        //console.log(userData.usuarioLogin)
    };

    return (
        <KeyboardAvoidingView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showReservaModal}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={profileModal.container}>
                        <View
                            style={{ ...profileModal.border, height: 520 }}
                        ></View>
                        <View style={profileModal.modal}>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => setShowReservaModal(false)}
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
                                Reserva
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
                                        Fecha
                                    </Text>
                                    <TextInput
                                        style={[
                                            profileModal.textInput,
                                            typography.body,
                                        ]}
                                        value={reserva?.fecha}
                                        editable={false}
                                    />
                                    <Text
                                        style={[
                                            typography.body,
                                            {
                                                color: colors.white,
                                                marginBottom: 5,
                                            },
                                        ]}
                                    >
                                        Horario
                                    </Text>
                                    <TextInput
                                        style={[
                                            profileModal.textInput,
                                            typography.body,
                                        ]}
                                        value={reserva?.horaInicio.concat(
                                            " - " + reserva?.horaFin
                                        )}
                                        editable={false}
                                    />
                                    <Text
                                        style={[
                                            typography.body,
                                            {
                                                color: colors.white,
                                                marginBottom: 5,
                                            },
                                        ]}
                                    >
                                        Fisioterapeuta
                                    </Text>
                                    <TextInput
                                        style={[
                                            profileModal.textInput,
                                            typography.body,
                                        ]}
                                        value={
                                            reserva?.idEmpleado.nombreCompleto
                                        }
                                        editable={false}
                                    />
                                    <Text
                                        style={[
                                            typography.body,
                                            {
                                                color: colors.white,
                                                marginBottom: 5,
                                            },
                                        ]}
                                    >
                                        Cliente
                                    </Text>
                                    <TextInput
                                        style={[
                                            profileModal.textInput,
                                            typography.body,
                                        ]}
                                        value={
                                            reserva?.idCliente.nombreCompleto
                                        }
                                        editable={false}
                                    />
                                    <Text
                                        style={[
                                            typography.body,
                                            {
                                                color: colors.white,
                                                marginBottom: 5,
                                            },
                                        ]}
                                    >
                                        Observación
                                    </Text>
                                    <TextInput
                                        style={[
                                            profileModal.textInput,
                                            typography.body,
                                        ]}
                                        value={reserva?.observacion}
                                        onChangeText={(text) =>
                                            updateField("observacion", text)
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
                                        Asistencia
                                    </Text>
                                    <TextInput
                                        style={[
                                            profileModal.textInput,
                                            typography.body,
                                        ]}
                                        value={reserva?.flagAsistio}
                                        onChangeText={(text) =>
                                            updateField("flagAsistio", text)
                                        }
                                    />
                                </View>
                            </ScrollView>
                            <View style={profileModal.buttonsContainer}>
                                <TouchableOpacity
                                    style={profileModal.primaryButton}
                                    onPress={handleSubmit}
                                    //onPress={pruebas}
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

export default ReservaModal;
