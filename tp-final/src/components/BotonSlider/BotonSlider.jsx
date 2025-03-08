import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

const BotonSlider = ({onPress, direccion}) => {
    //direccion = 0 ANTERIOR
    //direccion = 1 PROXIMO

    const imagenSlider = direccion == 0 ?
                            require('../../assets/images/sliderProximo.png')
                            : require('../../assets/images/sliderAnterior.png');

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.contenedorImagen}>
                <Image source={imagenSlider}
                        style={styles.imagen}/>
            </View>
        </TouchableOpacity>
    );
};

export default BotonSlider;