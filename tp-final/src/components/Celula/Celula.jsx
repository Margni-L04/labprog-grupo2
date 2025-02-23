import React, {useState} from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './styles';

const Celula = ({estaViva, onPress}) => {
    return (
        <TouchableOpacity style={[styles.celula, {backgroundColor: estaViva === 1 ? 'black' : 'white'}]}
            onPress={onPress} />
    );
};

export default Celula;