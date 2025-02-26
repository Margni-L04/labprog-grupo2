import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import HomeScreen from "../../screens/Home/Home";
import PatronesScreen from "../../screens/Patrones/Patrones";
import JuegoScreen from "../../screens/Juego/Juego";

const logo = require("../../assets/images/logo.png");
const logoInvertido = require("../../assets/images/logoInvertido.png");

const Tab = createMaterialTopTabNavigator();

const Navbar = () => {
    const [imagen, setImagen] = useState(logo);

    const modificarImagen = () => {
        setImagen((prevImagen) =>
            prevImagen === logo
                ? logoInvertido
                : logo
        );
    };
    
    return (
        <NavigationContainer>
            <View style={styles.contenedor}>
                {/* Imagen interactiva */}
                {/*<TouchableOpacity onPress={modificarImagen} style={styles.contenedorImagen}>
                    <Image source={imagen} style={styles.imagen} />
                </TouchableOpacity>*/}

                {/* Barra de navegación */}
                <Tab.Navigator
                    screenOptions={{
                        tabBarIndicatorStyle: styles.fondoPag,
                        tabBarStyle: styles.barraNav,
                        tabBarLabelStyle: styles.labelBarraNav,
                        tabBarPressColor: 'transparent'
                        }} >
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Patrones" component={PatronesScreen} />
                    <Tab.Screen name="Jugar" component={JuegoScreen} />
                </Tab.Navigator>
            </View>
      </NavigationContainer>
    );
};

export default Navbar;