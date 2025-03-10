import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDD0C8'
    },

    contenedorCards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 30,
        margin: 'auto'
    },

    contenedorPatrones: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '100%',
        height: 'auto',
        paddingVertical: 80
    },

    infoTipoPatron: {
        flexDirection: 'column',
        width: '100%',
        padding: 10
    },

    sliderPatrones: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 10,
        width: '100%',
    },

    tituloPatron: {
        fontFamily: 'quicksand-bold',
        fontWeight: 'normal',
        fontSize: 30,
        marginLeft: 15,
        userSelect: 'none'
    }
});

export default styles;