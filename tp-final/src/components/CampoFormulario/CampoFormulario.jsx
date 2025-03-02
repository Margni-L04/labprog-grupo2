import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import * as Font from 'expo-font';
import styles from './styles';

const Formulario = ({nombre, valor, setValor}) => {
    const [fontLoaded, setFontLoaded] = useState(false);
    
    useEffect(() => {
        if(!fontLoaded) {
            Font.loadAsync({
                'quicksand-bold': require('../../assets/fonts/Quicksand-Bold.ttf')
            })
        }
    });

    return (
        <View style={styles.caja}>
            <TextInput style={styles.texto}
                placeholder={nombre}
                value={valor}
                onChangeText={setValor} />
        </View>
    );
};

export default Formulario;