import {
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
} from "@expo-google-fonts/work-sans";
import { StyleSheet } from "react-native";

const typography = StyleSheet.create({
    title1: {
        fontFamily: "WorkSans_500Medium",
        fontWeight: "500",
        fontSize: 35,
        lineHeight: 34,
    },
    title2: {
        fontFamily: "WorkSans_700Bold",
        fontWeight: "700",
        fontSize: 22,
        lineHeight: 26,
    },
    title3: {
        fontFamily: "WorkSans_400Regular",
        fontWeight: "400",
        fontSize: 20,
        lineHeight: 22,
    },
    headline: {
        fontFamily: "WorkSans_600SemiBold",
        fontWeight: "600",
        fontSize: 17,
        lineHeight: 20,
    },
    subhead: {
        fontFamily: "WorkSans_600SemiBold",
        fontWeight: "600",
        fontSize: 15,
        lineHeight: 22.5,
    },
    body: {
        fontFamily: "WorkSans_400Regular",
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 21,
    },
    overline: {
        fontFamily: "WorkSans_500Medium",
        fontWeight: "500",
        fontSize: 10,
        lineHeight: 17,
        letterSpacing: 3,
    },
    caption: {
        fontFamily: "WorkSans_400Regular",
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 18,
    },
});

export { typography };
