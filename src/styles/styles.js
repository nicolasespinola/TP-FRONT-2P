import { StyleSheet } from "react-native";
import colors from "./colors";

const loginScreen = StyleSheet.create({
    inputsContainer: {
        backgroundColor: colors.neutral2,
        paddingVertical: 50,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
});

const inputs = StyleSheet.create({
    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: colors.neutral1,
        color: colors.white,
        marginBottom: 30,
    },
    loginButton: {
        backgroundColor: colors.secondary,
        padding: 20,
        borderRadius: 5,
        alignItems: "center",
    },
});

const profileModal = StyleSheet.create({
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#38385F",
        borderRadius: 5,
        backgroundColor: "#2A2A47",
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: colors.white,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    border: {
        backgroundColor: colors.primary,
        width: "80%",
        height: 650,
        borderRadius: 20,
    },
    modal: {
        backgroundColor: "#1F1F3C",
        width: "90%",
        borderRadius: 25,
        position: "absolute",
        marginTop: "auto",
        marginBottom: "auto",
        paddingTop: 20,
        paddingBottom: 0,
        paddingHorizontal: 30,
        maxHeight: "80%",
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    primaryButton: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 20,
        borderRadius: 30,
        marginRight: 10,
    },
    secondaryButton: {
        borderWidth: 2,
        borderColor: colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 20,
        borderRadius: 30,
    },
});

export { loginScreen, inputs, profileModal };
