import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const BotonCelulas = ({nombre, onPress}) => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        if(!fontLoaded) {
            Font.loadAsync({
                'quicksand': require('../../assets/fonts/Quicksand.ttf')
            })
        }
    });

    return (
        <TouchableOpacity style={styles.boton} onPress={onPress}>
            <Text style={styles.nombre}>{nombre}</Text>
        </TouchableOpacity>
    );
};

export default BotonCelulas;