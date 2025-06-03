import { StyleSheet } from "react-native";

export const pacienteDetalheStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    sectionTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10
    },
    entry: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderLeftWidth: 4,
        borderLeftColor: '#007bff'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    noRecordsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#777',
        fontStyle: 'italic',
    }
});
