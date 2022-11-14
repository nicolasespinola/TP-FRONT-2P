import React, { useContext, useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { typography } from "../styles/typography";
import colors from "../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { inputs, loginScreen } from "../styles/styles";
import { getUsuariosDelSistema } from "../api/loginApi";
import LoadingScreen from "./LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";
const LoginScreen = ({ navigation }) => {
    const [inputData, setInputData] = useState({ user: "", password: "" });
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const { login } = useContext(AuthContext);

    const fetchUsuarios = async () => {
        const response = await getUsuariosDelSistema();
        setListaUsuarios(response.lista);
        setLoading(false);
    };

    const updateFields = (field, value) => {
        setInputData({ ...inputData, [field]: value });
    };

    const onPressHandler = () => {
        for (let user of listaUsuarios) {
            if (user.usuarioLogin === inputData.user) {
                login(JSON.stringify(user));
            }
            break;
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                paddingHorizontal: 32,
                backgroundColor: colors.neutral1,
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ marginTop: 50, marginBottom: 50 }}>
                        <Text
                            style={[typography.title1, { color: colors.white }]}
                        >
                            Hola!
                        </Text>
                        <Text
                            style={[typography.title3, { color: colors.white }]}
                        >
                            Inicia sesión para continuar
                        </Text>
                    </View>
                    <View style={loginScreen.inputsContainer}>
                        <Text
                            style={[
                                typography.body,
                                { color: colors.white, marginBottom: 5 },
                            ]}
                        >
                            Usuario
                        </Text>
                        <TextInput
                            style={[inputs.textInput, typography.body]}
                            value={inputData.user}
                            onChangeText={(value) =>
                                updateFields("user", value)
                            }
                        />
                        <Text
                            style={[
                                typography.body,
                                { color: colors.white, marginBottom: 5 },
                            ]}
                        >
                            Contraseña
                        </Text>
                        <TextInput
                            secureTextEntry={true}
                            style={[inputs.textInput, typography.body]}
                            value={inputData.password}
                            onChangeText={(value) =>
                                updateFields("password", value)
                            }
                        />

                        <TouchableOpacity
                            style={inputs.loginButton}
                            onPress={onPressHandler}
                        >
                            <Text
                                style={[
                                    typography.headline,
                                    { color: colors.white },
                                ]}
                            >
                                Iniciar Sesión
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
