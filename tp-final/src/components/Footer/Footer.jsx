import React from "react";
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import styles from './styles';

const cuentasGit = require('../../json/cuentas-git.json');

const Footer = () => {
    return (
        <View style={styles.fondo}>
            {cuentasGit.map((cuenta) => (
                <View key={cuenta.nombre} style={styles.cajaUsuario}>
                    <TouchableOpacity style={styles.botonGit} onPress={() => Linking.openURL(cuenta.link)}>
                        <FontAwesome name='github' size={40} color='white'/>
                    </TouchableOpacity>
                    <Text style={styles.cuenta}>{cuenta.nombre}</Text>
                </View>
            ))}
        </View>
    );
};

export default Footer;