import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { UserContext } from "../userContext";
import { API_URL } from "../config";
import { financiasStyles } from '../styles/financiasStyles';
import { loadingStyles } from "../styles/loadingStyles";

export default function FinanciasScreen() {
    const { user } = useContext(UserContext);
    const [relatorios, setRelatorios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarRelatorios();
    }, []);

    const carregarRelatorios = async () => {
        try {
            const rota = user.tipoUsuario === 'psicologo' ? `${API_URL}/financias/${user.id}` : `${API_URL}/financias/paciente/${user.id}`;

            const response = await fetch(rota);
            if (!response.ok) {
                const texto = await response.text();
                console.error('Erro na API:', texto);
                return;
            }
            const data = await response.json();
            setRelatorios(data);
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={financiasStyles.card}>
            <Text>{new Date(item.date).toLocaleDateString('pt-BR')}</Text>
            <Text>Paciente: {item.paciente.nome}</Text>
            <Text>Doutor: {item.psicologo.nome}</Text>
            <Text>Valor: R${item.pagamento}</Text>
            <Text>Imposto: R${item.imposto}</Text>
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
        <View style={financiasStyles.container}>
            <Text style={financiasStyles.titulo}>Relatórios Financeiros</Text>
            {relatorios.length > 0 ? (
                <FlatList 
                    data={relatorios}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            ) : (
                <Text style={financiasStyles.noRecordsText}>Nenhum Relatório encontrado.</Text>
            )}
        </View>
    );
}
