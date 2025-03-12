//Server donde se subieron las imagenes: https://freeimage.host
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';

//componentes
import FlipCard from '../../components/FlipCard/FilpCard';
import Patron from '../../components/Patron/Patron';
import Footer from '../../components/Footer/Footer';
import Formulario from '../../components/Formulario/Formulario';
import BotonSlider from '../../components/BotonSlider/BotonSlider';

//estilos
import styles from './styles';

//backend
import API_URL from "../../../backend/myip";

const tamPag = 3;

const Patrones = () => {
    const [tiposPatronesFlip, setTiposPatronesFlip] = useState([]);
    const [tiposPatronesSlider, setTiposPatronesSlider] = useState([]);
    const [dataPatrones, setDataPatrones] = useState({});

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

    //cargar las flip card y los tipos de patrones para los slider
    useEffect(() => {
        fetchFlipCards();
        fetchTiposPatrones();
    }, []);

    //si cambian los tipos de patrones del slider, creamos un slider por cada uno
    useEffect(() => {
        tiposPatronesSlider.forEach(tPatron => fetchPatronesDeTipo(tPatron, 1));
    }, [tiposPatronesSlider]);

    //fetch para carga de las flip cards
    const fetchFlipCards = () => { 
        fetch(`${API_URL}/api/tipospatrones`) 
            .then(response => response.json()) 
            .then(jsonResponse => setTiposPatronesFlip(jsonResponse)) 
            .catch(error => console.log(error));
    };

    //fetch para carga de los tipos de patrones para generar cada slider
    const fetchTiposPatrones = () => { 
        fetch(`${API_URL}/api/patrones?tipospatrones=true`)
            .then(response => response.json()) 
            .then(jsonResponse => setTiposPatronesSlider(jsonResponse)) 
            .catch(error => console.log(error));

        //devuelve un arreglo de strings, donde cada uno nos indica un tipo de patrón del slider
    }; 

    //fetch para carga de los patrones de cada slider
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

    //acción al presionar para avanzar la página de un slider
    const avanzarPagina = (tipoPatron) => {
        if((dataPatrones[tipoPatron]?.patrones.length || 0) == tamPag) {
            //completamos la página, hay más que mostrar (al menos el formulario)
            const nuevaPag = (dataPatrones[tipoPatron]?.numPag || 0) + 1;

            fetchPatronesDeTipo(tipoPatron, nuevaPag);
        }
    };

    //acción al presionar para retroceder la página de un slider
    const retrocederPagina = (tipoPatron) => {
        if((dataPatrones[tipoPatron]?.numPag || 0) > 1) {
            //no estamos en la primer página, podemos retroceder
            const nuevaPag = (dataPatrones[tipoPatron]?.numPag || tamPag) - 1;

            fetchPatronesDeTipo(tipoPatron, nuevaPag);
        }
    };

    const renderTiposPatrones = ({item}) => (
        <FlipCard
            imagen={item.imagen}
            texto={item.descripcion}
            titulo={item.nombre} />
    );

    const renderSliderPatrones = ({item}) => {
        const listaPatrones = (dataPatrones[item]?.patrones || []);
        const pagActual = (dataPatrones[item]?.numPag || 1);
        const cantPatrones = (listaPatrones?.length || 0);

        return (
            <View style={styles.infoTipoPatron}>
                <Text style={styles.tituloPatron}>{item}</Text>
                <View style={styles.sliderPatrones}>
                    <BotonSlider onPress={() => retrocederPagina(item)}
                        direccion={1}
                        activo={pagActual > 1} />
                    {listaPatrones.map((pat, i) => (
                        <Patron key={i} nombre={pat.nombrePatron} imagen={pat.imagen} />
                    ))}
                    {cantPatrones < tamPag && <Formulario tipoPatron={item}/>}
                    <BotonSlider onPress={() => avanzarPagina(item)}
                        direccion={0}
                        activo={cantPatrones == tamPag} />
                </View>
            </View>
        );
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
                    renderItem={renderSliderPatrones}
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.contenedorPatrones}
                    scrollEnabled={false} />
            </View>
            <Footer/>
        </ScrollView>
  );
}

export default Patrones;