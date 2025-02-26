import { View } from 'react-native';
import styles from './styles';
import TejidoCelulas from '../../components/TejidoCelulas/TejidoCelulas';
import Footer from '../../components/Footer/Footer';

const Juego = () => {
  return (
        <View style={styles.container}>
            <TejidoCelulas />
            <Footer/>
        </View>
  );
}

export default Juego;