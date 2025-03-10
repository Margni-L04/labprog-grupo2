import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    contenedorCard: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 160,
        height: 210,
        textAlign: 'center',
        borderRadius: 10,
        margin: 10
    },
    
    frente: {
        width: '100%',
        height: '100%',
        marginTop: 10,
        width: 160,
        height: 210,
        backgroundColor: '#CE9C7D'
    },
    
    atras: {
        textAlign: 'center',
        width: 160,
        height: 210,
        backgroundColor: '#E3AC8A'
    },
    
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        position: 'absolute',
        backfaceVisibility: 'hidden',
    },

    titulo: {
        fontFamily: 'space-grotesk',
        fontWeight: 'bold',
        fontSize: 20,
        userSelect: 'none'
    },
    
    text: {
        fontFamily: 'quicksand',
        fontSize: 13,
        userSelect: 'none',
        margin: 12
    },

    imagen: {
        width: 125,
        height: 125,
        borderRadius: 5,
        margin: 10
    }
});

export default styles;