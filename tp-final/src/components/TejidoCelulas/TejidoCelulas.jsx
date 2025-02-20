import React, {useCallback, useState} from 'react';
import { View } from 'react-native';
import styles from './styles';
import Celula from '../Celula/Celula';
import BotonCelulas from '../BotonCelulas/BotonCelulas';

const tamanioTejido = 40;

const generarTejidoInicial = () => {
    return Array(tamanioTejido)
        .fill(0)
        .map(() => Array(tamanioTejido).fill(1));
};

const TejidoCelula = () => {
    const [celulas, setCelulas] = useState(generarTejidoInicial());

    const actualizarCelula = (fila, col) => {
        setCelulas(celulasAntes => {
            const nuevasCelulas = celulasAntes.map(fila => [...fila]);

            if(nuevasCelulas[fila][col] === 1) {
                nuevasCelulas[fila][col] = 0;
            } else {
                nuevasCelulas[fila][col] = 1;
            }

            return nuevasCelulas;
        });
    };

    return (
        <View>
            <View style={styles.contenedorCelulas}>
                {celulas.map((fila, i) => (
                    <View key={i} style={styles.fila}>
                        {fila.map((estado, j) => (
                            <Celula key={i*tamanioTejido+j} estaViva={estado} onPress={() => actualizarCelula(i, j)}/>
                        ))}
                    </View>
                ))}
            </View>
            <View style={styles.contenedorBotones}>
                <BotonCelulas nombre="hola"/>
                <BotonCelulas nombre="que miras"/>
                <BotonCelulas nombre="chau"/>
            </View>
        </View>
    );
};

export default TejidoCelula;