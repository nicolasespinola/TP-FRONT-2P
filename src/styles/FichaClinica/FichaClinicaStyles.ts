import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 32,
        backgroundColor: colors.neutral1,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        paddingHorizontal: 16,
    },
    headerText: {
        textAlign: "left",
    },
    fichaList: {
        marginBottom: 20,
    },
    fichaItem: {
        backgroundColor: colors.neutral2,
        padding: 16,
        marginBottom: 8,
        borderRadius: 16,
    },
    fichaItemTitle: { color: colors.white },
    fichaItemBody: { color: colors.white },
});

export default styles;
