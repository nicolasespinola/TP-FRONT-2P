import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { typography } from "../styles/typography";
import colors from "../styles/colors";
import { Feather } from "@expo/vector-icons";

const Card = ({ item, setSelectedReserva, setShowReservaModal, setCreate }) => {
    const handlePress = () => {
        setCreate(false);
        setSelectedReserva(item.item);
        setShowReservaModal(true);
    };
    //console.log(item.item)
    return (
        <TouchableOpacity onPress={handlePress}>
            <View
                style={{
                    backgroundColor:
                        item.item.flagEstado === "R"
                            ? colors.neutral2
                            : "#DC7069",
                    borderRadius: 10,
                    padding: 20,
                    marginBottom: 10,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <View>
                    <Text
                        style={[
                            typography.body,
                            { color: colors.white, marginBottom: 5 },
                        ]}
                    >
                        {item.item.fecha}
                    </Text>
                    <Text style={[typography.caption, { color: colors.white }]}>
                        {item.item.horaInicio} - {item.item.horaFin}
                    </Text>
                    <Text style={[typography.body, { color: colors.white }]}>
                        Fisioterapeuta: {item.item.idEmpleado.nombreCompleto}
                    </Text>
                    <Text style={[typography.body, { color: colors.white }]}>
                        Cliente: {item.item.idCliente.nombreCompleto}
                    </Text>
                </View>
                {item.item.flagEstado === "R" ? (
                    <View
                        style={{
                            padding: 10,
                            backgroundColor: colors.primary,
                            borderRadius: 50,
                        }}
                    >
                        <Feather name="edit-2" size={20} color={colors.white} />
                    </View>
                ) : null}
            </View>
        </TouchableOpacity>
    );
};

export default Card;
