import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Boton from '../components/Boton/Boton';
import Caja from '../components/Caja/Caja';
import Navbar from '../components/Navbar/Navbar';
import Celula from '../components/Celula/Celula';
import TejidoCelulas from '../components/TejidoCelulas/TejidoCelulas';

const Home = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={{color:'green'}}>Holaaaaaaaa</Text>
      <StatusBar style='auto' />
      <Boton title='Sip' />
      <Caja titulo='noooas' />
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

export default Home;