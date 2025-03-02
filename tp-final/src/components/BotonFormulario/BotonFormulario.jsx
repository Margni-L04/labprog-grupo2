import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Text, View } from 'react-native';
import * as Font from 'expo-font';
import styles from './styles';

const BotonFormulario = ({titulo, onPress, color}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [fontLoaded, setFontLoaded] = useState(false);
    
    useEffect(() => {
        if(!fontLoaded) {
            Font.loadAsync({
                'quicksand-bold': require('../../assets/fonts/Quicksand-Bold.ttf')
            })
        }
    });

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.boton, {backgroundColor: color}]}>
                <Text style={styles.titulo}>{titulo}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default BotonFormulario;