import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Input } from 'react-native-elements';
import { useAuth } from "../providers/Context";


const LoginScreen = () => {
    const { login } = useAuth();

    return (
        <View style={styles.container}>
            <Input
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                style={styles.input}
            />
            <Input
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                style={styles.input}
            />
            <Text>pas nécessaire de remplir les inputs !</Text>
            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.textButton}>Register</Text>
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
    textButton: {
        color: '#fff',
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