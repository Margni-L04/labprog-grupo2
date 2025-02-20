import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    contenedorCelulas: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50
    },

    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        margin: 0,
        padding: 0
    },

    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    }
});

export default styles;