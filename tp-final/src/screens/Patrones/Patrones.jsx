//Server donde se subieron las imagenes: https://freeimage.host

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import FlipCard from '../../components/FlipCard/FilpCard';
import Patron from '../../components/Patron/Patron';
import Footer from '../../components/Footer/Footer';
import Formulario from '../../components/Formulario/Formulario';
import BotonSlider from '../../components/BotonSlider/BotonSlider';
import API_URL from "../../../backend/myip";

const tamPag = 3;

const Patrones = () => {
    const [tiposPatronesFlip, setTiposPatronesFlip] = useState([]);
    const [tiposPatronesSlider, setTiposPatronesFlipSlider] = useState([]);
    const [dataPatrones, setDataPatrones] = useState({});
    //const [ejsPatrones, setEjsPatrones] = useState([]);

    /*
    Estructura de dataPatrones:
    {
        "unTipoPatron": {"patrones": [ {"nombre": unNombrePatron, "imagen": unaUrlImagenPatron}
                                    ... a lo sumo tamPag veces
                                    ],
                        "numPag": unNumeroDePagina},
        ...
    }
    */

    useEffect(() => {
        fetchTiposPatrones();
        fetchPatrones();
    }, []);

    useEffect(() => {
        tiposPatronesSlider.forEach(tPatron => fetchPatronesDeTipo(tPatron, 1));
    }, [tiposPatronesSlider]);

    const fetchTiposPatrones = () => { 
        fetch(`${API_URL}/api/tipospatrones`) 
            .then(response => response.json()) 
            .then(jsonResponse => setTiposPatronesFlip(jsonResponse)) 
            .catch(error => console.log(error));
    };

    /*const fetchPatrones = () => { 
        //fetch(`${API_URL}/api/patrones?tipospatrones=true`) 
        fetch(`${API_URL}/api/patrones`) 
            .then(response => response.json()) 
            .then(jsonResponse => setEjsPatrones(jsonResponse)) 
            .catch(error => console.log(error));
    };*/

    const fetchPatrones = () => { 
        fetch(`${API_URL}/api/patrones?tipospatrones=true`)
            .then(response => response.json()) 
            .then(jsonResponse => setTiposPatronesFlipSlider(jsonResponse)) 
            .catch(error => console.log(error));
    }; 

    const fetchPatronesDeTipo = (tipoPatron, pagina) => { 
        const desde = (pagina - 1) * tamPag;

        fetch(`${API_URL}/api/patrones/${tipoPatron}?cantidad=${tamPag}&desde=${desde}`)
            .then(response => response.json()) 
            .then(jsonResponse => {
                setDataPatrones(dataAntes => ({
                    ...dataAntes,
                    [tipoPatron]: {"patrones": jsonResponse, "numPag": pagina}
                }));
            }) 
            .catch(error => console.log(error));
    }; 

    const renderTiposPatrones = ({item}) => (
        <FlipCard
            imagen={item.imagen}
            texto={item.descripcion}
            titulo={item.nombre} />
    );

    /*const renderPatrones = ({item}) => (
        <View style={styles.infoTipoPatron}>
            <Text style={styles.tituloPatron}>{item.nombre}</Text>
            <View style={styles.sliderPatrones}>
                {(item.patrones).map((pat, i) => (
                    <Patron key={i} nombre={pat.nombrePatron} imagen={pat.imagen}/>
                ))}
                {item.patrones.length > 0 && <Formulario tipoPatron={item.nombre}/>}
            </View>
        </View>
    );*/

    const renderPatrones = ({item}) => (
        <View style={styles.infoTipoPatron}>
            <Text style={styles.tituloPatron}>{item}</Text>
            <View style={styles.sliderPatrones}>
                <BotonSlider onPress={() => retrocederPagina(item)} direccion={1} />
                {(dataPatrones[item]?.patrones || []).map((pat, i) => (
                    <Patron key={i} nombre={pat.nombrePatron} imagen={pat.imagen}/>
                ))}
                {(dataPatrones[item]?.patrones.length || 0) < tamPag
                    && <Formulario tipoPatron={item.nombre}/>}
                <BotonSlider onPress={() => avanzarPagina(item)} direccion={0} />
            </View>
        </View>
    );

    const avanzarPagina = (tipoPatron) => {
        if((dataPatrones[tipoPatron]?.patrones.length || 0) == tamPag) {
            //Completamos la página, hay más que mostrar (al menos el formulario)
            const nuevaPag = (dataPatrones[tipoPatron]?.numPag || 0) + 1;

            fetchPatronesDeTipo(tipoPatron, nuevaPag);
        }
    };

    const retrocederPagina = (tipoPatron) => {
        if((dataPatrones[tipoPatron]?.numPag || 0) > 1) {
            //No estamos en la primer página, podemos retroceder
            const nuevaPag = (dataPatrones[tipoPatron]?.numPag || 0) - 1;

            fetchPatronesDeTipo(tipoPatron, nuevaPag);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <FlatList
                    data={tiposPatronesFlip}
                    renderItem={renderTiposPatrones}
                    keyExtractor={(item) => item.nombre}
                    contentContainerStyle={styles.contenedorCards}
                    scrollEnabled={false} />
            </View>
            <View>
                <FlatList
                    data={tiposPatronesSlider}
                    renderItem={renderPatrones}
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.contenedorPatrones}
                    scrollEnabled={false} />
                {/*<FlatList
                    data={ejsPatrones}
                    renderItem={renderPatrones}
                    keyExtractor={(item) => item.nombre}
                    contentContainerStyle={styles.contenedorPatrones}
                    scrollEnabled={false} />*/}
            </View>
            <Footer/>
        </ScrollView>
  );
}

export default Patrones;