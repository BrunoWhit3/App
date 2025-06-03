import { StyleSheet } from "react-native";

export const loadingStyles = StyleSheet.create({
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
