import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import colors from "../styles/colors";
import { typography } from "../styles/typography";
import { Feather } from "@expo/vector-icons";

const PatientListItem = ({
    item,
    setSelectedPatient,
    setShowProfileModal,
    setCreate,
}) => {
    const handlePress = () => {
        setCreate(false);
        setSelectedPatient(item);
        setShowProfileModal(true);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View
                style={{
                    backgroundColor: colors.neutral2,
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
                        {item.nombre} {item.apellido}
                    </Text>
                    <Text style={[typography.caption, { color: colors.white }]}>
                        {item.email}
                    </Text>
                </View>
                <View
                    style={{
                        padding: 10,
                        backgroundColor: colors.primary,
                        borderRadius: 50,
                    }}
                >
                    <Feather name="edit-2" size={20} color={colors.white} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default PatientListItem;
