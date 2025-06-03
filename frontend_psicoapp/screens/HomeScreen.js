import React, { useContext } from "react";
import { View, Text, Button, Alert, TouchableOpacity } from "react-native";
import { homeStyles } from '../styles/homeStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../userContext";

export default function HomeScreen({ navigation }) {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async () => {
        Alert.alert(
            'Sair', 'Tem certeza que deseja sair?',
            [
                {text: 'Cancelar', style: 'cancel'},
                {text: 'Sair', onPress: async () => {
                    try {
                        await AsyncStorage.removeItem('users');
                        setUser(null);
                    } catch (error) {
                        console.error('Erro: ', error);
                        Alert.alert('Erro', 'Não foi possível sair. Tente novamente');
                    }
                }}
            ],
            {cancelable: true}
        );
    };

    return (
        <View style={homeStyles.container}>
            <Text style={homeStyles.welcome}>Bem-vindo, {user.nome}</Text>
            {user.tipoUsuario === 'psicologo' ? (
                <Button title="Ver Pacientes" />
            ) : (
                <>
                    <Button title="Meu Diário" onPress={() => navigation.navigate('Diario')} />
                    <Button title="Feedback dos seus sentimentos" onPress={() => navigation.navigate('Feedback')} />
                </>
            )}
            <Button title="Relatórios Financeiros" onPress={() => navigation.navigate('Financias')} />
            <TouchableOpacity onPress={handleLogout}>
                <Text style={homeStyles.link}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}
