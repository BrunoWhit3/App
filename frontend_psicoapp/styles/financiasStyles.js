import { StyleSheet } from "react-native";

export const financiasStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    card: {
        padding: 20,
        borderWidth: 1,
        marginBottom: 10
    },
    noRecordsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#777',
        fontStyle: 'italic'
    }
});
