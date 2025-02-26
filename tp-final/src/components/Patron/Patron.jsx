import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import * as Font from 'expo-font';
import styles from './styles';

const Patron = ({nombre, imagen}) => {
    const [nombreOculto, setNombreOculto] = useState(true);
    const [opacityImagen, setOpacityImagen] = useState(1);
    const [opacityNombre, setOpacityNombre] = useState(0);

    const mostrarNombre = () => {
        if(nombreOculto) {
            setOpacityImagen(0.3);
            setOpacityNombre(1);
        } else {
            setOpacityImagen(1);
            setOpacityNombre(0);
        }

        setNombreOculto(!nombreOculto);
    };

    return (
        <TouchableWithoutFeedback onPress={mostrarNombre}>
            <View style={styles.contenedor}>
                <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg'}}
                    style={[styles.imagen, {opacity: opacityImagen}]}/>
                <Text style={[styles.nombre, {opacity: opacityNombre}]}>{nombre}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Patron;