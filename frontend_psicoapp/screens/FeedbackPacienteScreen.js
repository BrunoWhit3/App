import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, ActivityIndicator } from "react-native";
import { API_URL } from "../config";
import { loadingStyles } from "../styles/loadingStyles";
import { feedbackPacienteStyles } from '../styles/feedbackPacienteStyles';

export default function FeedbackUserScreen({ route }) {
    const { paciente } = route.params;
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarFeedbacks();
    }, []);

    const carregarFeedbacks = async () => {
        try {
            const response = await fetch(`${API_URL}/feedback/paciente/${paciente._id}`);
            const data = await response.json();
            setFeedbacks(data);
        } catch (error) {
            console.error('Erro', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={feedbackPacienteStyles.card}>
            <Text style={feedbackPacienteStyles.date}>
                {new Date(item.date).toLocaleDateString('pt-BR')} às {new Date(item.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}
            </Text>
            <Text style={feedbackPacienteStyles.item}>Estresse: {item.estresse}</Text>
            <Text style={feedbackPacienteStyles.item}>Ansiedade: {item.ansiedade}</Text>
            <Text style={feedbackPacienteStyles.item}>Tristeza: {item.tristeza}</Text>
            <Text style={feedbackPacienteStyles.item}>Desânimo: {item.desanimo}</Text>
            <Text style={feedbackPacienteStyles.item}>Comentário: {item.feedback}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={loadingStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#6a0dad" />
                <Text style={loadingStyles.loadingText}>Carregando feedbacks...</Text>
            </View>
        );
    }

    return (
        <View style={feedbackPacienteStyles.container}>
            <Text style={feedbackPacienteStyles.titulo}>Feedbacks de {paciente.nome}</Text>
            {feedbacks.length > 0 ? (
                <FlatList 
                    data={feedbacks} 
                    keyExtractor={(item) => item._id} 
                    renderItem={renderItem} 
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            ) : (
                <Text style={feedbackPacienteStyles.noRecordsText}>Nenhum Feedback encontrado.</Text>
            )}
        </View>
    );
}
