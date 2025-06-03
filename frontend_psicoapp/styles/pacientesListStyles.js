import { StyleSheet } from "react-native";

export const pacientesListStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    card: {
        padding: 10,
        borderWidth: 1,
        marginBottom: 10
    },
    titulo: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    noRecordsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#777',
        fontStyle: 'italic',
    }
});
