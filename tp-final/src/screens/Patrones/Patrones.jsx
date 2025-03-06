//Server donde se subieron las imagenes: https://freeimage.host

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from './styles';
import FlipCard from '../../components/FlipCard/FilpCard';
import Patron from '../../components/Patron/Patron';
import Footer from '../../components/Footer/Footer';
import Formulario from '../../components/Formulario/Formulario';
import API_URL from "../../../backend/myip";

const Patrones =  () => {
    const [ejsPatrones, setEjsPatrones] = useState([]);
    const [tiposPatrones, setTiposPatrones] = useState([]);

    useEffect(() => { 
            fetchPatrones();
            fetchTiposPatrones();
        },[]);

    const fetchPatrones = () => { 
        fetch(`${API_URL}/api/patrones`) 
            .then(response => response.json()) 
            .then(jsonResponse => setEjsPatrones(jsonResponse)) 
            .catch(error => console.log(error)) 
    }; 

    const fetchTiposPatrones = () => { 
        fetch(`${API_URL}/api/tipospatrones`) 
            .then(response => response.json()) 
            .then(jsonResponse => setTiposPatrones(jsonResponse)) 
            .catch(error => console.log(error)) 
    }; 

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
            <View style={styles.contenedorPatrones}>
                {ejsPatrones.map((tPatron, i) => (
                    <View key={i} style={styles.infoTipoPatron}>
                        <Text style={styles.tituloPatron}>{tPatron.nombre}</Text>
                        <View style={styles.sliderPatrones}>
                            {(tPatron.patrones).map((pat, j) => (
                                <Patron key={j} nombre={pat.nombrePatron} imagen={pat.imagen}/>
                            ))}
                            <Formulario tipoPatron={tPatron.nombre}/>
                        </View>
                    </View>
                ))}
            </View>
            <Footer/>
        </ScrollView>
  );
}

export default Patrones;