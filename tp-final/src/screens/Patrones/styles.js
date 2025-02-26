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
        padding: 10
    },

    sliderPatrones: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding: 0,
        width: '100%',
    },

    tituloPatron: {
        fontFamily: 'quicksand',
        fontWeight: 'normal',
        fontSize: 25,
        userSelect: 'none'
    }
});

export default styles;