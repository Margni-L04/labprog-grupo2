import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    contenedor: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '80%',
        height: 50,
        marginVertical: 10
    },

    caja: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F7BC97',
        width: '100%',
        height: 35,
        borderRadius: 10,
        marginVertical: 5
    },

    titulo: {
        fontFamily: 'quicksand',
        fontSize: 15,
        paddingLeft: 10
    },

    texto: {
        paddingLeft: 10,
        width: '100%'
    }
});

export default styles;