import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    contenedorCard: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 160,
        height: 200,
        textAlign: 'center',
        borderRadius: 10,
        margin: 10
    },
    
    frente: {
        width: '100%',
        height: '100%',
        marginTop: 10,
        width: 160,
        height: 200
    },
    
    atras: {
        textAlign: 'center',
        width: 160,
        height: 200,
    },
    
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        position: 'absolute',
        backfaceVisibility: 'hidden',
        backgroundColor: '#CE9C7D'
    },

    titulo: {
        fontFamily: 'space-grotesk',
        fontWeight: 'bold',
        fontSize: 17,
        userSelect: 'none'
    },
    
    text: {
        fontFamily: 'quicksand',
        fontWeight: 'bold',
        fontSize: 13,
        userSelect: 'none',
        margin: 12
    },

    imagen: {
        
    }
});

export default styles;