import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState, useEffect } from "react";
import LoadingScreen from "./src/screens/LoadingScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import AuthProvider, { AuthContext } from "./src/contexts/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
    useFonts,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
} from "@expo-google-fonts/work-sans";
import colors from "./src/styles/colors";
import Reserva from "./src/screens/Reserva";
import PatientScreen from "./src/screens/PatientScreen";
import { FichaClinicaScreen } from "./src/screens/FichaClinica/FichaClinicaScreen";
import CreateReservaScreen from "./src/screens/CreateReservaScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppTabs = function (props) {
    return (
        <Tab.Navigator
            initialRouteName="Pacientes"
            screenOptions={{
                tabBarActiveTintColor: colors.secondary,
                tabBarInactiveTintColor: "#c9c9c9",
                tabBarStyle: {
                    backgroundColor: "#FFF",
                    height: 70,
                    borderTopWidth: 0,
                },
                tabBarItemStyle: {
                    height: 70,
                    paddingTop: 5,
                    paddingBottom: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 15,
                },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Pacientes"
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5
                            name="hospital-user"
                            size={24}
                            color={color}
                        />
                    ),
                }}
                component={PatientScreen}
            />
            <Tab.Screen
                name="Reservas"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="time" size={24} color={color} />
                    ),
                }}
                component={Reserva}
            />
            <Tab.Screen
                name="Fichas"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo
                            name="text-document-inverted"
                            size={24}
                            color={color}
                        />
                    ),
                }}
                component={FichaClinicaScreen}
            />
        </Tab.Navigator>
    );
};

const NavigatorRoot = () => {
    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated === false) {
        return <AppTabs />;
    } else if (isAuthenticated === false) {
        return <LoginScreen />;
    } else {
        return <LoadingScreen />;
    }
};

export default function App() {
    const [loading, setLoading] = useState(true);
    let [fontsLoaded] = useFonts({
        WorkSans_400Regular,
        WorkSans_500Medium,
        WorkSans_600SemiBold,
        WorkSans_700Bold,
    });

    useEffect(() => {
        (async () => {
            await AsyncStorage.getItem("user");
            setLoading(false);
        })();
    }, []);

    if (loading || !fontsLoaded) {
        return <LoadingScreen />;
    }

    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Root" component={NavigatorRoot} />
                    <Stack.Screen
                        name="Create Reserva"
                        component={CreateReservaScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}
