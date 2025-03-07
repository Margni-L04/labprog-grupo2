import React,{ useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native'
import Navbar from './src/components/Navbar/Navbar';
import * as Font from "expo-font";

const App = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        if(!fontLoaded) {
            Font.loadAsync({
                'quicksand': require('./src/assets/fonts/Quicksand.ttf'),
                'quicksand-bold': require('./src/assets/fonts/Quicksand-Bold.ttf'),
                'ps2': require("./src/assets/fonts/PressStart2P.ttf"),
                'space-grotesk': require("./src/assets/fonts/SpaceGrotesk.ttf")
            });

            setFontLoaded(true);
        }
    });

    return (
        fontLoaded ?
            <View style={styles.container}>
                <Navbar />
            </View>
            :
            <View style={styles.containerCarga}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando fuentes...</Text>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },

    containerCarga: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default App;