import { StyleSheet, ScrollView, View } from 'react-native';
import FlipCard from '../components/FlipCard/FilpCard';

const tiposPatrones = require('../json/tipos-patrones.json');

const Patrones = () => {
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
        </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDD0C8'
    },

    contenedorCards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 30,
        margin: 'auto'
    }
});

export default Patrones;