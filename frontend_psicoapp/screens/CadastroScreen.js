import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ActivityIndicator, ScrollView, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { cadastroStyles } from '../styles/cadastroStyles';
import { API_URL } from "../config";

export default function CadastroScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('paciente');
    const [accessKey, setAccessKey] = useState('');
    const [loading, setLoading] = useState(false);

    const cadastrar = async () => {
        if (!nome || !email || !senha || !confirmarSenha) {
            Alert.alert('Erro de Cadastro', 'Por favor, preencha todos os campos.');
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert('Erro de Cadastro', 'As senhas não coincidem.');
            return;
        }

        if (senha.length < 6) {
            Alert.alert('Erro de Cadastro', 'A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        const body = { nome, email, senha, tipoUsuario };
        if (tipoUsuario === 'psicologo') body.accessKey = accessKey;

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });
            const data = await response.json();

            if (response.ok) {
                Alert.alert('Sucesso', data.message, [{text: 'Ir para login', onPress: () => navigation.goBack()}]);
            } else {
                Alert.alert('Erro ao se cadastrar', data.message);
            }
        } catch (error) {
            console.error('Erro ao cadastrar: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                behavior="height"
                style={cadastroStyles.container}
            >
                <ScrollView contentContainerStyle={cadastroStyles.contentContainer}>
                    <Text style={cadastroStyles.titulo}>Cadastro</Text>
                    <TextInput style={cadastroStyles.input} 
                        placeholder="Nome" 
                        value={nome} 
                        onChangeText={setNome} 
                    />
                    <TextInput style={cadastroStyles.input} 
                        placeholder="E-mail" 
                        value={email} 
                        onChangeText={setEmail} 
                    />
                    <TextInput style={cadastroStyles.input} 
                        placeholder="Senha" 
                        secureTextEntry
                        value={senha} 
                        onChangeText={setSenha} 
                    />
                    <TextInput style={cadastroStyles.input} 
                        placeholder="Confirmar Senha" 
                        secureTextEntry
                        value={confirmarSenha} 
                        onChangeText={setConfirmarSenha} 
                    />
                    {tipoUsuario === 'psicologo' && 
                        <TextInput style={cadastroStyles.input} 
                            placeholder="Chave de Acesso" 
                            value={accessKey} 
                            onChangeText={setAccessKey}
                        />
                    }
                    <Button title={tipoUsuario} onPress={() => setTipoUsuario(tipoUsuario === 'paciente' ? 'psicologo' : 'paciente')} />
                    <View style={{ marginBottom: 10 }} />
                    {loading ? (
                        <ActivityIndicator size='large' color='#007BFF' />
                    ) : (
                        <Button title="Cadastrar" onPress={cadastrar} />
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}
