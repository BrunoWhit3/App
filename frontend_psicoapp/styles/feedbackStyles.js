import { StyleSheet } from "react-native";

export const feedbackStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    resultado: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20
    }
});
