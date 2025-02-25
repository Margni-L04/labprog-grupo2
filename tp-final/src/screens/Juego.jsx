import { StyleSheet, Text, View } from 'react-native';
import TejidoCelulas from '../components/TejidoCelulas/TejidoCelulas';

const Juego = () => {
  return (
    <View style={styles.container}>
      <TejidoCelulas />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD0C8'
  },
});

export default Juego;