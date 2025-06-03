import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, FlatList, Alert, TouchableOpacity, Button, ActivityIndicator, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
import { UserContext } from "../userContext";
import { API_URL } from "../config";
import { diarioStyles } from '../styles/diarioStyles';

export default function DiarioEmocionalScreen({ navigation }) {
    const { user } = useContext(UserContext);
    const [humorGeral, setHumorGeral] = useState('');
    const [descricao, setDescricao] = useState('');
    const [saving, setSaving] = useState(false);

    const humorEmojis = {
        'Muito Feliz': '😄', 'Feliz': '😊', 'Neutro': '😐', 'Triste': '😞',
        'Ansioso': '😟', 'Irritado': '😡', 'Cansado': '😴', 'Grato': '🙏'
    };

    const salvarRegistro = async () => {
        if (!humorGeral || !descricao.trim()) {
            Alert.alert('Atenção', 'Selecione um humor e digite uma descrição.');
            return;
        }

        setSaving(true);
        try {
            await fetch(`${API_URL}/diario/add`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ user: user.id, text: `${humorGeral}: ${descricao}` })
            });
            setHumorGeral('');
            setDescricao('');
            Alert.alert('Sucesso', 'Entrada salva no Diário');
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro ao salvar:', error.message);
        } finally {
            setSaving(false);
        }
    };

    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                behavior="height" 
                style={diarioStyles.container}
            >
                <ScrollView contentContainerStyle={diarioStyles.contentContainer}>
                    <Text style={diarioStyles.title}>Diário Emocional</Text>
                    <Text style={diarioStyles.subtitle}>Como você se sente?</Text>
                    <View style={diarioStyles.moodSelector}>
                        {Object.keys(humorEmojis).map(humor => (
                            <TouchableOpacity key={humor} style={[diarioStyles.moodButton, humorGeral === humor && diarioStyles.                 selectedMoodButton]} onPress={() => setHumorGeral(humor)}>                   
                                <Text style={diarioStyles.moodEmoji}>{humorEmojis[humor]}</Text>
                                <Text style={diarioStyles.moodText}>{humor}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TextInput style={diarioStyles.input} 
                        placeholder="Descreva..." 
                        value={descricao}
                        onChangeText={setDescricao} 
                        multiline 
                    />
                    {saving ? (
                        <ActivityIndicator size='large' color='#007BFF' />
                    ) : (
                        <Button title="Salvar no Diário" onPress={salvarRegistro} />
                    )}
                    <Button title="Histórico de Registros" onPress={() => navigation.navigate('DiarioUser')} />
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}
