import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#DDD0C8',
        height: 2000
    },

    containerTitulo: {
        position: 'relative',
        backgroundColor: '#DDD0C8',
        alignItems: 'center',
        height: 400,
        width: "100%",
        overflow: 'hidden'
    },

    titulo:{
        fontFamily: 'ps2',
        position: 'relative',
        fontWeight: 100,
        fontSize: 30,
        color: 'black',
        zIndex: 1,
        marginTop: 130,
        textAlign: 'center'
    },

    fondo: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        opacity: 0.4,
        zIndex: -1
    },

    contenedorExplicacion: {
        position: 'relative',
        backgroundColor: '#e5bb89',
        alignItems: 'center'
    },

    tituloPreguntas:{
        fontFamily: 'quicksand-bold',
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        marginTop: 10
    },

    textoPreguntas:{
        fontFamily: 'quicksand',
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        margin: 10
    },

    contenedorReglas: {
        paddingVertical: 40
    },

    tituloReglas:{
        fontFamily: 'quicksand-bold',
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
        marginTop: 10
    },

    textoReglas:{
        fontFamily: 'quicksand',
        fontSize: 14,
        color: 'black',
        margin: 10,
        left: 5
    },

    imagenReglas:{
        margin: 5,
        left: 80,
        position: 'relative',
        width: 200,
        height: 148,
        alignItems: 'center'
    },
    contenedorCards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 30,
        margin: 'auto'
    },
});

export default styles;