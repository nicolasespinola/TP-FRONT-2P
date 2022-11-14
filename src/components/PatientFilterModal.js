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
import colors from "../styles/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "../styles/typography";
import { profileModal } from "../styles/styles";
import moment from "moment";
import { deletePatient, postPaciente } from "../api/patientApi";

const PatientFilterModal = ({
    showFilterModal,
    setShowFilterModal,
    updatePatientList,
}) => {
    const [inputs, setInputs] = useState({ nombre: "", apellido: "" });

    const updateField = (field, value) => {
        setInputs({ ...inputs, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            setInputs({ nombre: "", apellido: "" });
            await updatePatientList(inputs);
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
                                    value={inputs.nombre}
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
                                    value={inputs.apellido}
                                    onChangeText={(text) =>
                                        updateField("apellido", text)
                                    }
                                />
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
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default PatientFilterModal;
