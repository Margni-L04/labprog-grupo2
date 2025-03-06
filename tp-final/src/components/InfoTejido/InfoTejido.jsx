import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const InfoTejido = ({texto}) => {

    return (
        <View style={styles.cajaTexto}>
            <Text style={styles.texto}>{texto}</Text>
        </View>
    );
};

export default InfoTejido;