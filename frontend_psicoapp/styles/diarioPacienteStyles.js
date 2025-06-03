import { StyleSheet } from "react-native";

export const diarioPacienteStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f4f8'
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    registroCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#6a0dad',
        elevation: 3
    },
    registroDate: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5
    },
    registroText: {
        fontSize: 16,
        color: '#333'
    },
    list: {
        flex: 1,
    },
    noRecordsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#777',
        fontStyle: 'italic',
    }
});
