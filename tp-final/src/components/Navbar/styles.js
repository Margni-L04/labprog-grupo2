import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        flexDirection: 'row'
    },

    fondoPag: {
        backgroundColor: 'brown'
    },

    barraNav: {
        backgroundColor: '#e5bb89',
        paddingTop: 25
    },

    labelBarraNav: {
        fontSize: 18
    },

    contenedorImagen: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },

    imagen: {
        width: 50,
        height: 50,
        resizeMode: "contain"
    }
});

export default styles;