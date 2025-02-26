import React,{ useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import { Image } from 'expo-image';
import * as Font from "expo-font";
import styles from './styles';
import Footer from '../../components/Footer/Footer';

const fondo = require('../../assets/gifs/conway.gif');
const regla1 = require('../../assets/images/Regla1.png');
const regla2 = require('../../assets/images/Regla2.png');

const Home = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        if(!fontLoaded) {
            Font.loadAsync({
                'quicksand': require('../../assets/fonts/Quicksand.ttf'),
                'quicksand-bold': require('../../assets/fonts/Quicksand-Bold.ttf'),
                'ps2': require("../../assets/fonts/PressStart2P.ttf")
            })
        }
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>Juego de la Vida de Conway</Text>
                <Image source={fondo} style={styles.fondo} contentFit="cover"/>
            </View>
            <View style={styles.contenedorExplicacion}>
                <Text style={styles.tituloPreguntas}>¿Qué es el Juego de la Vida?</Text>
                <Text style={styles.textoPreguntas}>El juego de la vida de Conway es un modelo matemático computacional que simula sistemas naturales formados por muchos objetos que llamaremos células, que interactúan entre sí con unas reglas muy sencillas. En ciertas ocasiones, de estas reglas pueden surgir cosas tan complejas que parecen casi mágicas. El objetivo de hacer matemáticas es también jugar, y eso es precisamente lo que vamos a hacer. Vamos ajugar al juego de la vida de Conway, un juego diseñado para cero jugadores.</Text>
                <Text style={styles.tituloPreguntas}>¿Cómo funciona?</Text>
                <Text style={styles.textoPreguntas}>Este juego consta de un número infinito de celdas, pero para poder visualizarlo veremos una vista finita, que debemos imaginar que se extiende hacia el infinito en todas direcciones. Cada celda, que llamaremos "células", se comporta como si fuera un organismo vivo. Existen dos posibilidades: una célula está viva (que pintaremos de color negro) o está muerta (de color blanco).</Text>
            </View>
            <View style={styles.contenedorReglas}>
                <Text style={styles.tituloReglas}>Regla 1</Text>
                <Text style={styles.textoReglas}>Si una célula está viva:
                    {"\n"}- Si tiene más de 3 vecinos vivos, muere por sobrepoblación.
                    {"\n"}- Si tiene menos de 2 células vecinas vivas, muere por aislación.
                    {"\n"}- Si tiene 2 o 3 células vecinas vivas, sobrevive.</Text>
                <Image source={regla1} style={styles.imagenReglas}/>
                <Text style={styles.tituloReglas}>Regla 2</Text>
                <Text style={styles.textoReglas}>Si una célula está muerta:
                    {"\n"}- Si tiene 3 vecinos vivos, revive.
                    {"\n"}- En otro caso, continua muerta.</Text>
                <Image source={regla2} style={styles.imagenReglas}/>
            </View>
            <Footer />
        </ScrollView>
    );
}

export default Home;