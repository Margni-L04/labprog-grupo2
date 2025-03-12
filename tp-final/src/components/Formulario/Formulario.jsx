import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, Image, Alert } from 'react-native';

//componentes
import CampoFormulario from '../CampoFormulario/CampoFormulario';
import BotonFormulario from '../BotonFormulario/BotonFormulario';

//estilos
import styles from './styles';

//backend
import API_URL from "../../../backend/myip";

const imagenMas = require('../../assets/images/mas.jpeg');

const Formulario = ({tipoPatron}) => {
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const cerrar = () => {
        setModalVisible(false);
        setNombre('');
        setImagen('');
    };

    //fetch post para carga de nuevo patrón
    const cargar = async () => {
        try {
            const respuesta = await fetch(
                `${API_URL}/api/patrones/${tipoPatron}`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({
                        imagen: imagen,
                        nombrePatron: nombre
                    })
                })
                    /*.then(response => { response.json() })
                    .then(data => { console.log('Patrón agregado') });*/
            
            if(respuesta.ok) {
                //post se hizo correctamente
                console.log('Patrón agregado');

                cerrar();
            } else {
                //no se pudo hacer el post
                const errorData = await respuesta.json();
                const errorMensaje = errorData.message;
                let mensajeAlerta;

                if(errorMensaje.includes('nombrePatron')) {
                    mensajeAlerta = 'Falta ingresar el nombre del patrón';
                } else if(errorMensaje.includes('imagen')) {
                    mensajeAlerta = 'Falta ingresar la url de la imagen';
                } else {
                    mensajeAlerta = 'Nombre de patrón ya existente. Ingrese uno nuevo';
                }

                Alert.alert(mensajeAlerta);
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.contenedorImagen}>
                    <Image source={imagenMas}
                            style={styles.imagen}/>
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.formulario}>
                    <Text style={styles.titulo}>Carga de {tipoPatron}</Text>
                    <CampoFormulario nombre='Nombre patrón'
                        valor={nombre}
                        setValor={setNombre}/>
                    <CampoFormulario nombre='URL imagen'
                        valor={imagen}
                        setValor={setImagen}/>
                    <View style={styles.contenedorBotones}>
                        <BotonFormulario titulo={'Cerrar'}
                            onPress={cerrar}
                            color='#D10209' />
                        <BotonFormulario titulo={'Cargar'}
                            onPress={cargar}
                            color='#2B7C40' />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Formulario;