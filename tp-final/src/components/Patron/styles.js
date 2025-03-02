import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    contenedor: {
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

    nombre: {
        fontFamily: 'quicksand-bold',
        position: 'absolute',
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 600,
        //color: '#8A502C',
        color: 'black',
        userSelect: 'none'
    }
});

export default styles;