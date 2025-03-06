import React, { useState} from 'react';
import { TouchableWithoutFeedback, Text, View } from 'react-native';
import styles from './styles';

const BotonFormulario = ({titulo, onPress, color}) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.boton, {backgroundColor: color}]}>
                <Text style={styles.titulo}>{titulo}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default BotonFormulario;