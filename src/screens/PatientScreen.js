import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import colors from "../styles/colors";
import { getPacientes } from "../api/patientApi";
import LoadingScreen from "./LoadingScreen";
import { typography } from "../styles/typography";
import PatientListItem from "../components/PatientListItem";
import PatientProfileModal from "../components/PatientProfileModal";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PatientFilterModal from "../components/PatientFilterModal";

const PatientScreen = () => {
    const [patientList, setPatientList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [create, setCreate] = useState(null);

    useEffect(() => {
        const fetchPacientes = async () => {
            const response = await getPacientes({});
            setPatientList(response.lista);
            setLoading(false);
        };
        fetchPacientes();
    }, []);

    const updatePatientList = async (data) => {
        setLoading(true);
        const response = await getPacientes(data);
        setPatientList(response.lista);
        setLoading(false);
    };

    if (loading) return <LoadingScreen />;

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 32,
                backgroundColor: colors.neutral1,
            }}
        >
            <PatientProfileModal
                showProfileModal={showProfileModal}
                setShowProfileModal={setShowProfileModal}
                selectedPatient={selectedPatient}
                updatePatientList={updatePatientList}
                create={create}
            />
            <PatientFilterModal
                showFilterModal={showFilterModal}
                setShowFilterModal={setShowFilterModal}
                updatePatientList={updatePatientList}
            />
            <Header text="Pacientes" style={{fontSize: '35px !important'}}/>
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
                    onPress={() => updatePatientList({})}
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
                        setCreate(true);
                        setShowProfileModal(true);
                        setSelectedPatient(null);
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
                data={patientList}
                keyExtractor={(item) => item.idPersona}
                renderItem={({ item }) => (
                    <PatientListItem
                        item={item}
                        setShowProfileModal={setShowProfileModal}
                        setSelectedPatient={setSelectedPatient}
                        setCreate={setCreate}
                    />
                )}
            />
        </View>
    );
};

export default PatientScreen;
