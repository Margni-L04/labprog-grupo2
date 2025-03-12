import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Linking, FlatList } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

//estilos
import styles from './styles';

//backend
import API_URL from "../../../backend/myip";

const Footer = () => {
    const [cuentasGit, setCuentasGit] = useState([]);

    useEffect(() => { 
        fetchCuentasGit();
    }, []);
    
    //fetch para cargar las cuentas git
    const fetchCuentasGit = () => { 
        fetch(`${API_URL}/api/cuentasgit`)
            .then(response => response.json())
            .then(jsonResponse => setCuentasGit(jsonResponse))
            .catch(error => console.log(error));
    };

    const renderCuenta = ({item}) => (
        <View style={styles.cajaUsuario}>
            <TouchableOpacity style={styles.botonGit} onPress={() => Linking.openURL(item.link)}>
                <FontAwesome name='github' size={40} color='white'/>
            </TouchableOpacity>
            <Text style={styles.nombreCuenta}>{item.nombre}</Text>
        </View>
    );

    return (
        <View>
            <FlatList
                data={cuentasGit}
                renderItem={renderCuenta}
                keyExtractor={item => item.nombre}
                horizontal={true}
                contentContainerStyle={styles.fondo} />
        </View>
    );
};

export default Footer;