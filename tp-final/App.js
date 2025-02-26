import { View, ScrollView, StyleSheet } from 'react-native'
import Navbar from './src/components/Navbar/Navbar';
//import Footer from './src/components/Footer/Footer';

const App = () => {
    return(
        <View style={styles.container}>
            <Navbar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    }
});

export default App;