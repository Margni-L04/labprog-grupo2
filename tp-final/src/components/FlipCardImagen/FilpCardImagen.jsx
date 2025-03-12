import React, { useState, useRef } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'expo-image';

//estilos
import styles from './styles';

const FlipCardImagen = ({imagen, imagen2, titulo, titulo2}) => {
    const [estaFrente, setEstaFrente] = useState(true);
    const animacionFlip = useRef(new Animated.Value(0)).current;

    //cómo rota cuando está la card hacia adelante
    const giroFrente = animacionFlip.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg']
    });

    //cómo rota cuando está la card hacia atrás
    const giroAtras = animacionFlip.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
    });

    //acción de rotar cuando está el frente
    const rotarFrente = {
        transform: [{rotateY: giroFrente}]
    };

    //acción de rotar cuando está hacia atrás
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
                    <Image source={imagen} style={styles.imagen}/>
                    <Text style={styles.titulo}>{titulo}</Text>
                </Animated.View>
                <Animated.View style={[styles.atras, styles.card, rotarAtras]}>
                    <Image source={imagen2} style={styles.imagen}/>
                    <Text style={styles.titulo}>{titulo2}</Text>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default FlipCardImagen;