import { StyleSheet } from "react-native";

export const feedbackPacienteStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        backgroundColor: '#f0f4f8'
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333'
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#6a0dad',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
        fontStyle: 'italic'
    },
    item: {
        fontSize: 14,
        color: '#555',
        marginBottom: 2
    },
    feedback: {
        fontSize: 14,
        color: '#333',
        marginTop: 5
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8'
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555'
    },
    noRecordsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#777',
        fontStyle: 'italic'
    }
});
