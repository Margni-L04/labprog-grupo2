import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

//estilos
import styles from './styles';

const BotonSlider = ({onPress, direccion, activo}) => {
    //direccion = 0 ANTERIOR
    //direccion = 1 PROXIMO
    const imagenSlider = direccion == 0 ?
                            require('../../assets/images/sliderProximo.png')
                            : require('../../assets/images/sliderAnterior.png');

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.contenedorImagen}>
                <Image source={imagenSlider}
                        style={[styles.imagen, {opacity: activo ? 1 : 0}]}/>
            </View>
        </TouchableOpacity>
    );
};

export default BotonSlider;