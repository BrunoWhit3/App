import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Text, ActivityIndicator, Card } from "react-native-paper";
import { API_URL } from "../config";
import { diarioPacienteStyles } from '../styles/diarioPacienteStyles';
import { loadingStyles } from "../styles/loadingStyles";

export default function DiarioPacienteScreen({ route }) {
    const { paciente } = route.params;
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarRegistros();
    }, []);

    const carregarRegistros = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/diario/paciente/${paciente._id}`);
            const data = await response.json();
            setRegistros(data);
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro ao carregar registros:', error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const renderItem = ({ item }) => (
        <Card style={diarioPacienteStyles.registroCard}>
            <Card.Title
                title={new Date(item.date).toLocaleDateString("pt-BR")}
                subtitle={`às ${new Date(item.date).toLocaleTimeString("pt-BR", { hour: "2-digit",
                minute: "2-digit" })}`}
                titleStyle={{ fontSize: 16 }}
                subtitleStyle={{ fontSize: 12 }}
            />
            <Card.Content>
                <Text variant="bodyMedium">{item.text}</Text>
            </Card.Content>
        </Card>
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
        <View style={diarioPacienteStyles.container}>
            <Text variant="headlineMedium" style={diarioPacienteStyles.titulo}>Diário de {paciente.nome}</Text>
            {registros.length > 0 ? (
                <FlatList
                    data={registros}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    style={diarioPacienteStyles.list}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            ) : (
                <Text style={diarioPacienteStyles.noRecordsText}>Nenhum registro de diário
                encontrado.</Text>
            )}
        </View>
    );
}
