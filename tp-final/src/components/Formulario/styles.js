import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    contenedorImagen: {
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: 75,
        margin: 7
    },

    imagen: {
        width: 75,
        height: 75,
        borderRadius: 10
    },

    formulario: {
        position: 'relative',
        top: '35%',
        left: '10%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '25%',
        backgroundColor: '#CE9C7D',
        borderColor: '#A67E65',
        borderWidth: 2
    },

    titulo: {
        fontFamily: 'quicksand-bold',
        fontSize: 17,
        paddingBottom: 20
    },

    contenedorBotones: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 10
    }
});

export default styles;