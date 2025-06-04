import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, ActivityIndicator } from "react-native";
import { API_URL } from "../config";
import { pacientesListStyles } from '../styles/pacientesListStyles';
import { loadingStyles } from "../styles/loadingStyles";

export default function PacientesListScreen({ navigation }) {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarPacientes();
    }, []);

    const carregarPacientes = async () => {
        try {
            const response = await fetch(`${API_URL}/users/pacientes`);
            const data = await response.json();
            setPacientes(data);
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={pacientesListStyles.card}>
            <Text>Paciente: {item.nome}</Text>
            <Button title="Ver Sessões" onPress={() => navigation.navigate('PacienteDetalhe', { paciente: item })} />
            <Button title="Ver Diário do Paciente" onPress={() => navigation.navigate('DiarioPaciente', { paciente: item })} />
            <Button title="Ver Feedbacks do Paciente" onPress={() => navigation.navigate('FeedbackPaciente', { paciente: item })} />
        </View>
    );

    if (loading) {
        return (
            <View style={loadingStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#6a0dad" />
                <Text style={loadingStyles.loadingText}>Carregando diário...</Text>
            </View>
        );
    }

    return (
        <View style={pacientesListStyles.container}>
            <Text style={pacientesListStyles.titulo}>Seus Pacientes</Text>
            {pacientes.length > 0 ? (
                <FlatList 
                    data={pacientes}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            ) : (
                <Text style={pacientesListStyles.noRecordsText}>Nenhum Paciente Registrado</Text>
            )}
        </View>
    );
}
