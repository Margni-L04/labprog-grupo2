import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import * as Font from 'expo-font';
import styles from './styles';

const FlipCard = ({imagen, texto, titulo}) => {
    const [estaFrente, setEstaFrente] = useState(true);
    const animacionFlip = useRef(new Animated.Value(0)).current;
    const [fontLoaded, setFontLoaded] = useState(false);
    
    useEffect(() => {
        if(!fontLoaded) {
            Font.loadAsync({
                'space-grotesk': require('../../assets/fonts/SpaceGrotesk.ttf')
            })
        }
    });

    useEffect(() => {
        if(!fontLoaded) {
            Font.loadAsync({
                'quicksand': require('../../assets/fonts/Quicksand.ttf')
            })
        }
    });

    const giroFrente = animacionFlip.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg']
    });

    const giroAtras = animacionFlip.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
    });

    const rotarFrente = {
        transform: [{rotateY: giroFrente}]
    };

    const rotarAtras = {
        transform: [{rotateY: giroAtras}]
    };

    const flip = () => {
        if(estaFrente) {
            Animated.spring(animacionFlip, {
                toValue: 180,
                friction: 8,
                tension: 10,
                useNativeDriver: true
            }).start();
        } else {
            Animated.spring(animacionFlip, {
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true
            }).start();
        }

        setEstaFrente(!estaFrente);
    };

    return (
        <TouchableWithoutFeedback onPress={flip}>
            <View style={styles.contenedorCard}>
                <Animated.View style={[styles.frente, styles.card, rotarFrente]}>
                    <Text style={styles.titulo}>{titulo}</Text>
                    <Image source={imagen} style={styles.imagen}/>
                </Animated.View>
                <Animated.View style={[styles.atras, styles.card, rotarAtras]}>
                    <Text style={styles.text}>{texto}</Text>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default FlipCard;