import React, { useState, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import * as Font from 'expo-font';
import styles from './styles';

const Formulario = ({nombre, valor, setValor}) => {
    const [fontLoaded, setFontLoaded] = useState(false);
    
    useEffect(() => {
        if(!fontLoaded) {
            Font.loadAsync({
                'quicksand': require('../../assets/fonts/Quicksand.ttf')
            })
        }
    });

    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>{nombre}</Text>
            <View style={styles.caja}>
                <TextInput style={styles.texto}
                    placeholder={`Ingresar '${nombre}'`}
                    value={valor}
                    onChangeText={setValor} />
            </View>
        </View>
    );
};

export default Formulario;