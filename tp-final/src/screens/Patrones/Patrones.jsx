//Server donde se subieron las imagenes: https://freeimage.host

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
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
        //fetch(`${API_URL}/api/patrones?tipospatrones=true`) 
        fetch(`${API_URL}/api/patrones`) 
            .then(response => response.json()) 
            .then(jsonResponse => setEjsPatrones(jsonResponse)) 
            .catch(error => console.log(error));
    }; 

    const fetchTiposPatrones = () => { 
        fetch(`${API_URL}/api/tipospatrones`) 
            .then(response => response.json()) 
            .then(jsonResponse => setTiposPatrones(jsonResponse)) 
            .catch(error => console.log(error));
    };

    const renderTiposPatrones = ({item}) => (
        <FlipCard
            imagen={item.imagen}
            texto={item.descripcion}
            titulo={item.nombre} />
    );

    const renderPatrones = ({item}) => (
        <View style={styles.infoTipoPatron}>
            <Text style={styles.tituloPatron}>{item.nombre}</Text>
            <View style={styles.sliderPatrones}>
                {(item.patrones).map((pat, j) => (
                    <Patron key={j} nombre={pat.nombrePatron} imagen={pat.imagen}/>
                ))}
                <Formulario tipoPatron={item.nombre}/>
            </View>
        </View>
    );

    const pedirPatrones = (tipoPatron, cantidad, pagina) => {
        const desde = (pagina - 1 ) * cantidad;
        let patrones;

        fetch(`${API_URL}/api/patrones/${tipoPatron}?cantidad=${cantidad}&desde=${desde}`) 
            .then(response => response.json()) 
            .then(jsonResponse => {patrones = jsonResponse}) 
            .catch(error => console.log(error));

        return patrones;
    };

    const renderPatrones2 = async ({item}) => {
        let patrones;

        await fetch(`${API_URL}/api/patrones/${item}?cantidad=${3}&desde=${0}`) 
            .then(response => response.json()) 
            .then(jsonResponse => {patrones = jsonResponse}) 
            .catch(error => console.log(error));
        
        return(
            <View style={styles.infoTipoPatron}>
                <Text style={styles.tituloPatron}>{item}</Text>
                    <View style={styles.sliderPatrones}>
                        {patrones.map((pat, j) => (
                        <Patron key={j} nombre={pat.nombrePatron} imagen={pat.imagen}/>
                    ))}
                </View>
            </View>
        )
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <FlatList
                    data={tiposPatrones}
                    renderItem={renderTiposPatrones}
                    keyExtractor={(item) => item.nombre}
                    contentContainerStyle={styles.contenedorCards}
                    scrollEnabled={false} />
            </View>
            <View>
                {/*<FlatList
                    data={ejsPatrones}
                    renderItem={renderPatrones2}
                    keyExtractor={item => item}
                    contentContainerStyle={styles.contenedorPatrones} />*/}
                <FlatList
                    data={ejsPatrones}
                    renderItem={renderPatrones}
                    keyExtractor={(item) => item.nombre}
                    contentContainerStyle={styles.contenedorPatrones}
                    scrollEnabled={false} />
            </View>
            <Footer/>
        </ScrollView>
  );
}

export default Patrones;