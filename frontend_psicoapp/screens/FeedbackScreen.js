import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert, ActivityIndicator, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
import { UserContext } from "../userContext";
import { API_URL } from "../config";
import { feedbackStyles } from '../styles/feedbackStyles';

export default function FeedbackScreen({ navigation }) {
    const { user } = useContext(UserContext);
    const [respostas, setRespostas] = useState('', '', '', '');
    const [resultado, setResultado] = useState('');
    const [saving, setSaving] = useState(false);

    const enviarFeedback = async () => {
        setSaving(true);
        const body = {
            user: user.id,
            estresse: +respostas[0],
            ansiedade: +respostas[1],
            tristeza: +respostas[2],
            desanimo: +respostas[3]
        };
        try {
            const response = await fetch(`${API_URL}/feedback/add`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });
            const data = await response.json();
            setResultado(data.feedback);
            Alert.alert('Sucesso', 'Feedback enviado com sucesso!');
        } catch (error) {
            console.error('Erro', error);
            Alert.alert('Erro', `Não foi possível enviar: ${error}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                behavior="height"
                style={feedbackStyles.container}
            >
                <ScrollView contentContainerStyle={feedbackStyles.contentContainer}>
                    <Text style={feedbackStyles.titulo}>Feedback de Bem-Estar</Text>
                    {['Estresse', 'Ansiedade', 'Tristeza', 'Desanimo'].map((q, i) => (
                        <TextInput key={i} 
                            style={feedbackStyles.input} 
                            placeholder={`${q} (0-3)`} 
                            keyboardType="numeric" 
                            onChangeText={t => {const r = [...respostas]; r[i] = t; setRespostas(r)}}
                        />
                    ))}
                    {saving ? (
                        <ActivityIndicator size='large' color='#007BFF' />
                    ) : (
                        <Button title="Enviar Feedback" onPress={enviarFeedback} />
                    )}
                    {resultado ? <Text style={feedbackStyles.resultado}>{resultado}</Text> : null}
                    <Button title="Histórico de Feedbacks" onPress={() => navigation.navigate('FeedbackUser')} />
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}