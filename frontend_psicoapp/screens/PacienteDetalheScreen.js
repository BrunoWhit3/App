import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../userContext";
import { API_URL } from "../config";
import { View, Text, TextInput, Button, FlatList, Modal, ActivityIndicator } from "react-native";
import { pacienteDetalheStyles } from '../styles/pacienteDetalheStyles';
import { modalStyles } from '../styles/modalStyles';
import { loadingStyles } from "../styles/loadingStyles";

export default function PacienteDetalheScreen({ route }) {
    const { user } = useContext(UserContext);
    const { paciente } = route.params;
    const [sessoes, setSessoes] = useState([]);
    const [dataSessao, setDataSessao] = useState('');
    const [notaSessao, setNotaSessao] = useState('');
    const [loading, setLoading] = useState(true);

    const [modalEditar, setModalEditar] = useState(false);
    const [modalCancelar, setModalCancelar] = useState(false);
    const [modalFinalizar, setModalFinalizar] = useState(false);
    const [sessaoAtual, setSessaoAtual] = useState(null);
    const [novaData, setNovaData] = useState('');
    const [novasNotas, setNovasNotas] = useState('');
    const [valorFinal, setValorFinal] = useState('');

    useEffect(() => {
        carregarSessoes();
    }, []);

    const carregarSessoes = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/sessoes/paciente/${paciente._id}`);
            const data = await response.json();
            setSessoes(data);
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const agendarSessao = async () => {
        const body = {
            paciente: paciente._id,
            psicologo: user.id,
            date: new Date(dataSessao),
            notas: notaSessao
        }

        await fetch(`${API_URL}/sessoes/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        setDataSessao('');
        setNotaSessao('');
        carregarSessoes();
    };


    const abrirModal = (tipo, sessao) => {
        setSessaoAtual(sessao);
        if (tipo === 'editar') {
            setNovaData(sessao.date.split('T')[0]);
            setNovasNotas(sessao.notas);
            setModalEditar(true);
        }
        if (tipo === 'cancelar') {
            setModalCancelar(true);
        }
        if (tipo === 'finalizar') {
            setModalFinalizar(true);
        }
    };

    const confirmarEdicao = async () => {
        await fetch(`${API_URL}/sessoes/update/${sessaoAtual._id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ date: new Date(novaData), notas: novasNotas })
        });
        setModalEditar(false);
        carregarSessoes();
    };

    const confirmarCancelamento = async () => {
        await fetch(`${API_URL}/sessoes/cancel/${sessaoAtual._id}`, { method: 'DELETE' });
        setModalCancelar(false);
        carregarSessoes();
    };

    const confirmarFinalizacao = async () => {
        await fetch(`${API_URL}/sessoes/complete/${sessaoAtual._id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ pagamento: parseFloat(valorFinal) })
        });
        setModalFinalizar(false);
        carregarSessoes();
    };

    const renderItem = ({ item }) => (
        <View style={pacienteDetalheStyles.entry}>
            {item.status === 'cancelado' ? (
                <>
                    <Text>{new Date(item.date).toLocaleDateString()} - {item.status}</Text>
                    <Text>Sessão Desmarcada</Text>
                </>
            ) : item.status === 'finalizada' ? (
                <>
                    <Text>{new Date(item.date).toLocaleDateString()} - {item.status}</Text>
                    <Text>Sessão Finalizada</Text>
                </>
            ) : (
                <>
                    <Text>{new Date(item.date).toLocaleDateString()} - {item.status}</Text>
                    <Button title="Editar" onPress={() => abrirModal('editar', item)} />
                    <Button title="Cancelar" color='red' onPress={() => abrirModal('cancelar', item)} />
                    <Button title="Finalizar" onPress={() => abrirModal('finalizar', item)} />
                </>
            )}
        </View>
    )

    if (loading) {
        return (
            <View style={loadingStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#6a0dad" />
                <Text style={loadingStyles.loadingText}>Carregando diário...</Text>
            </View>
        );
    }

    return (
        <View style={pacienteDetalheStyles.container}>
            <Text>Nome: {paciente.nome}</Text>
            <Text style={pacienteDetalheStyles.sectionTitulo}>Sessões:</Text>
            <FlatList 
                data={sessoes}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={() => (
                    <Text style={pacienteDetalheStyles.noRecordsText}>Nenhuma sessão encontrada.</Text>
                )}
            />
            <Text style={pacienteDetalheStyles.sectionTitulo}>Agendar nova sessão:</Text>
            <TextInput 
                placeholder="Data (YYYY-MM-DD)"
                value={dataSessao}
                onChangeText={setDataSessao}
                style={pacienteDetalheStyles.input}
            />
            <TextInput 
                placeholder="Notas"
                value={notaSessao}
                onChangeText={setNotaSessao}
                style={pacienteDetalheStyles.input}
            />
            <Button title="Agendar" onPress={agendarSessao} />

            {/* Modal Editar */}
            <Modal visible={modalEditar} transparent animationType="slide">
                <View style={modalStyles.modalBackground}>
                    <View style={modalStyles.modalContainer}>
                        <Text>Editar Sessão</Text>
                        <TextInput 
                            style={pacienteDetalheStyles.input}
                            value={novaData}
                            onChangeText={setNovaData}
                        />
                        <TextInput 
                            style={pacienteDetalheStyles.input}
                            value={novasNotas}
                            onChangeText={setNovasNotas}
                        />
                        <Button title="Salvar" onPress={confirmarEdicao} />
                        <Button title="Cancelar" onPress={() => setModalEditar(false)} />
                    </View>
                </View>
            </Modal>

            {/* Modal Cancelar */}
            <Modal visible={modalCancelar} transparent animationType="slide">
                <View style={modalStyles.modalBackground}>
                    <View style={modalStyles.modalContainer}>
                        <Text>Tem certeza que deseja cancelar?</Text>
                        <Button title="Sim" color="red" onPress={confirmarCancelamento} />
                        <Button title="Não" onPress={() => setModalCancelar(false)} />
                    </View>
                </View>
            </Modal>

            {/* Modal Finalizar */}
            <Modal visible={modalFinalizar} transparent animationType="slide">
                <View style={modalStyles.modalBackground}>
                    <View style={modalStyles.modalContainer}>
                        <Text>Finalizar Sessão</Text>
                        <TextInput 
                            style={pacienteDetalheStyles.input}
                            placeholder="Valor da consulta"
                            value={valorFinal}
                            onChangeText={setValorFinal}
                            keyboardType="numeric"
                        />
                        <Button title="Finalizar" onPress={confirmarFinalizacao} />
                        <Button title="Cancelar" onPress={() => setModalFinalizar(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
