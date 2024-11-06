import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Input } from 'react-native-elements';
import { useAuth } from "../providers/Context";
import { useColorScheme } from 'react-native';
import { getThemeStyles, getStyles } from './styles';


const LoginScreen = () => {
    const { login } = useAuth();

    const isDarkMode = useColorScheme() === 'dark';
    const styles_ = getStyles();
    const themeStyles = getThemeStyles(isDarkMode);

    return (
        <View style={[styles.container, themeStyles.backgroundColor]}>
            <Input
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                style={[styles.input, themeStyles.textColor]}
            />
            <Input
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                style={[styles.input, themeStyles.textColor]}
            />
            <Text style={themeStyles.textColor}>pas nécessaire de remplir les inputs !</Text>
            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={[styles_.textButton, themeStyles.textButtonColor]}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={[styles_.textButton, themeStyles.textColor]}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        marginBottom: 10,
    },
    button: {
        width: '80%',
        backgroundColor: '#F2C94C',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    social: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    icon: {
        color: '#3b5998',
        margin: 10,
    },
});

export default LoginScreen;