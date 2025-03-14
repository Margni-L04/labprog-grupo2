import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fondo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100%',
        height: 125
    },

    cajaUsuario: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    botonGit: {
        padding: 5
    },

    nombreCuenta: {
        color: 'white',
        fontSize: 15
    }
});

export default styles;