import { StyleSheet } from "react-native";

export const diarioStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15, 
        color: '#555',
        textAlign: 'center',
    },
    moodSelector: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 25, 
    },
    moodButton: {
        padding: 10,
        margin: 6, 
        borderRadius: 12, 
        backgroundColor: '#e9ecef',
        alignItems: 'center',
        width: 100, 
        borderWidth: 1,
        borderColor: '#ced4da',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    selectedMoodButton: {
        backgroundColor: '#D1C4E9', 
        borderColor: '#673AB7', 
        borderWidth: 2,
    },
    moodEmoji: {
        fontSize: 36,
        marginBottom: 5,
    },
    moodText: {
        fontSize: 13,
        textAlign: 'center',
        color: '#333',
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        minHeight: 120, 
        textAlignVertical: 'top',
        backgroundColor: '#fff',
        fontSize: 16,
        lineHeight: 22, 
    },
    historyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15,
        color: '#333',
        textAlign: 'center',
    },
    list: {
        flex: 1,
    },
    registroCard: {
        backgroundColor: '#ffffff',
        padding: 18, 
        borderRadius: 10,
        marginBottom: 12, 
        borderLeftWidth: 6, 
        borderLeftColor: '#6a0dad', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15, 
        shadowRadius: 4,
        elevation: 5,
    },
    registroDate: {
        fontSize: 13, 
        color: '#888',
        marginBottom: 5,
        fontStyle: 'italic',
    },
    registroHumor: {
        fontSize: 19, 
        fontWeight: 'bold',
        marginBottom: 8, 
        color: '#333',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    noRecordsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#777',
        fontStyle: 'italic',
    }
});
