import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { View, Text } from 'react-native';
import styles from './styles';

const InfoTejido = ({texto}) => {
    const [fontLoaded, setFontLoaded] = useState(false);
    
    useEffect(() => {
        if(!fontLoaded) {
            Font.loadAsync({
                'quicksand': require('../../assets/fonts/Quicksand.ttf')
            })
        }
    });

    return (
        <View style={styles.cajaTexto}>
            <Text style={styles.texto}>{texto}</Text>
        </View>
    );
};

export default InfoTejido;