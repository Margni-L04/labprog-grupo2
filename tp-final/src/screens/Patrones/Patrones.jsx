//Server donde se subieron las imagenes: https://freeimage.host

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import * as Font from 'expo-font';
import styles from './styles';
import FlipCard from '../../components/FlipCard/FilpCard';
import Patron from '../../components/Patron/Patron';
import Footer from '../../components/Footer/Footer';
import Formulario from '../../components/Formulario/Formulario';

const tiposPatrones = require('../../json/tipos-patrones.json');
const ejsPatrones = require('../../json/ejemplos-patrones.json');

const Patrones = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        if(!fontLoaded) {
            Font.loadAsync({
                'quicksand': require('../../assets/fonts/Quicksand.ttf')
            })
        }
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.contenedorCards}>
                {tiposPatrones.map((tPatron) => (
                    <FlipCard key={tPatron.nombre}
                        imagen={tPatron.imagen}
                        texto={tPatron.descripcion}
                        titulo={tPatron.nombre}/>
                ))}
            </View>
            <View style={styles.contenedorPatrones}>
                {ejsPatrones.map((tPatron, i) => (
                    <View key={i} style={styles.infoTipoPatron}>
                        <Text style={styles.tituloPatron}>{tPatron.nombre}</Text>
                        <View style={styles.sliderPatrones}>
                            {(tPatron.patrones).map((pat, j) => (
                                <Patron key={j} nombre={pat.nombrePatron} imagen={pat.imagen}/>
                            ))}
                            <Formulario tipoPatron={tPatron.nombre}/>
                        </View>
                    </View>
                ))}
            </View>
            <Footer/>
        </ScrollView>
  );
}

export default Patrones;