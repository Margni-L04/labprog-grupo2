import { View } from 'react-native';
import styles from './styles';
import TejidoCelulas from '../../components/TejidoCelulas/TejidoCelulas';

const Juego = () => {
  return (
        <View style={styles.container}>
            <TejidoCelulas />
        </View>
  );
}

export default Juego;