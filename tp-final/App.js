import React,{ useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native'
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
                'space-grotesk': require("./src/assets/fonts/SpaceGrotesk.ttf"),
            })
        }
    });
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