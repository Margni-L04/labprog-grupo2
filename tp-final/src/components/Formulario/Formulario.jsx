import React, { useState } from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, Image } from 'react-native';
import styles from './styles';
import CampoFormulario from '../CampoFormulario/CampoFormulario';
import BotonFormulario from '../BotonFormulario/BotonFormulario';

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

    const cargar = () => {
        //carga
        cerrar();
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