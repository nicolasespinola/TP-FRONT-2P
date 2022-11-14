import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Text, View, TouchableOpacity } from "react-native";
import colors from "../styles/colors";
import { typography } from "../styles/typography";
import { MaterialIcons } from "@expo/vector-icons";

const Header = ({ text }) => {
    const { logout } = useContext(AuthContext);

    return (
        <View style={{ marginTop: 50, marginBottom: 20 }}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text style={[typography.title1, { color: colors.white }]}>
                    {text}
                </Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.neutral2,
                        padding: 10,
                        borderRadius: 10,
                    }}
                    onPress={logout}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <MaterialIcons
                            name="logout"
                            size={18}
                            color="white"
                            style={{ marginRight: 5 }}
                        />
                        <Text
                            style={[typography.body, { color: colors.white }]}
                        >
                            Cerrar sesión
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;
