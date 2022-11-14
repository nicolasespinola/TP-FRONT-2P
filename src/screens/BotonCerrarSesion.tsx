import React from "react";
import colors from "../styles/colors";
import {Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {typography} from "../styles/typography";
import {TouchableOpacity} from "react-native-gesture-handler";

type CerrarSesionProps = {
    onPress: () => void
}

export const BotonCerrarSesion = ({onPress}: CerrarSesionProps) => {
    return (
        <TouchableOpacity style={{
            backgroundColor: colors.neutral2,
            padding: 10,
            borderRadius: 10,
        }}
                          onPress={onPress}>
            <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}>
                <MaterialIcons name="logout"
                               size={18}
                               color="white"
                               style={{marginRight: 5}}
                />
                <Text style={[
                    typography.body,
                    {color: colors.white},
                ]}>
                    Cerrar sesión
                </Text>
            </View>
        </TouchableOpacity>
    );
}