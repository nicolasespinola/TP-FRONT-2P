import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";

const LoadingScreen = () => {
    return (
        <View style={[styles.container]}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.neutral1,
    },
});
export default LoadingScreen;
