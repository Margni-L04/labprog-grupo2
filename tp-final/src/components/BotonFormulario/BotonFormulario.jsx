import React from 'react';
import { TouchableWithoutFeedback, Text, View } from 'react-native';
import styles from './styles';

const BotonFormulario = ({titulo, onPress, color}) => {

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.boton, {backgroundColor: color}]}>
                <Text style={styles.titulo}>{titulo}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default BotonFormulario;