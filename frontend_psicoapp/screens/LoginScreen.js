import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert, ActivityIndicator, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { loginStyles } from '../styles/loginStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../userContext";
import { API_URL } from '../config';

export default function LoginScreen({ navigation }) {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const logar = async () => {
        if (!email || !senha) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, senha })
            });
            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem('users', JSON.stringify(data.user));
                setUser(data.user);
            } else {
                Alert.alert('Erro', data.message);
            }
        } catch (error) {
            console.error('Erro: ', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={loginStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#6a0dad" />
                <Text style={loginStyles.loadingText}>Logando...</Text>
            </View>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                behavior="height"
                style={loginStyles.container}
            >
                <ScrollView contentContainerStyle={loginStyles.contentContainer}>
                    <Text style={loginStyles.titulo}>Login</Text>
                    <TextInput style={loginStyles.input} 
                        placeholder="E-mail" 
                        value={email} 
                        onChangeText={setEmail} 
                    />
                    <TextInput style={loginStyles.input} 
                        placeholder="Senha" 
                        secureTextEntry
                        value={senha} 
                        onChangeText={setSenha} 
                    />
                    <Button title="Entrar" onPress={logar} />
                    <View style={{ marginBottom: 10 }} />
                    <Button title="Cadastre-se" onPress={() => navigation.navigate('Cadastro')} />
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}
