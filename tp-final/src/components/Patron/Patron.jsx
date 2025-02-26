import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'expo-image';
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
                <Image source={{ uri: imagen}}
                    style={[styles.imagen, {opacity: opacityImagen}]}/>
                <Text style={[styles.nombre, {opacity: opacityNombre}]}>{nombre}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Patron;