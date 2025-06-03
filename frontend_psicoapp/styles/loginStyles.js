import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
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
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
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
    }
});
