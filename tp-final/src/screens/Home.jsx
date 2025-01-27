import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Boton from '../components/Boton/Boton';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={{color:'green'}}>Holaaaaaaaa</Text>
      <StatusBar style='auto' />
      <Boton title='Sip' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;