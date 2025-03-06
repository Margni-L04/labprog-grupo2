import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import styles from './styles';
import API_URL from "../../../backend/myip";

const Footer = () => {
    const [cuentasGit, setCuentasGit] = useState([]);
    useEffect(() => { 
        fetchCuentasGit();
    },[]);

const fetchCuentasGit = () => { 
    fetch(`${API_URL}/api/cuentasgit`) 
        .then(response => response.json()) 
        .then(jsonResponse => setCuentasGit(jsonResponse)) 
        .catch(error => console.log(error)) 
    }; 

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