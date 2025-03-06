import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const BotonCelulas = ({nombre, onPress}) => {

    return (
        <TouchableOpacity style={styles.boton} onPress={onPress}>
            <Text style={styles.nombre}>{nombre}</Text>
        </TouchableOpacity>
    );
};

export default BotonCelulas;