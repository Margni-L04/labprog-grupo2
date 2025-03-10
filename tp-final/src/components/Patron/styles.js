import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    contenedor: {
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 90,
        margin: 7
    },

    imagen: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },

    nombre: {
        fontFamily: 'quicksand-bold',
        position: 'absolute',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 600,
        //color: '#8A502C',
        color: 'black',
        userSelect: 'none'
    }
});

export default styles;