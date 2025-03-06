import React from 'react';
import { View, TextInput, Text } from 'react-native';
import styles from './styles';

const Formulario = ({nombre, valor, setValor}) => {

    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>{nombre}</Text>
            <View style={styles.caja}>
                <TextInput style={styles.texto}
                    placeholder={`Ingresar '${nombre}'`}
                    value={valor}
                    onChangeText={setValor} />
            </View>
        </View>
    );
};

export default Formulario;