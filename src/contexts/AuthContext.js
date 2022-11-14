import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userData, setUserData] = useState(null);

    const logout = async () => {
        setUserData(null);
        setIsAuthenticated(false);
        await AsyncStorage.removeItem("user");
    };

    const login = async (data) => {
        setUserData(data);
        setIsAuthenticated(true);
        await AsyncStorage.setItem("user", data);
    };

    const value = { isAuthenticated, userData, login, logout };

    useEffect(() => {
        const checkSesion = async () => {
            const data = await AsyncStorage.getItem("user");
            if (data) {
                setUserData(JSON.parse(data));
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        };
        checkSesion();
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export { AuthContext };
