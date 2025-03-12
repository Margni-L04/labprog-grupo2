import React from 'react';
import { View } from 'react-native';

//componentes
import TejidoCelulas from '../../components/TejidoCelulas/TejidoCelulas';
import Footer from '../../components/Footer/Footer';

//estilos
import styles from './styles';

const Juego = () => {
  return (
        <View style={styles.container}>
            <TejidoCelulas />
            <Footer/>
        </View>
  );
}

export default Juego;