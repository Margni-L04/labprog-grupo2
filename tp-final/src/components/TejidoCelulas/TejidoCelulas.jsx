import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from './styles';
import Celula from '../Celula/Celula';
import BotonCelulas from '../BotonCelulas/BotonCelulas';
import InfoTejido from '../InfoTejido/InfoTejido';

const tamanioTejido = 10;
let intervalo;

const generarTejidoInicial = () => {
    return Array(tamanioTejido)
        .fill(0)
        .map(() => Array(tamanioTejido).fill(0));
};

const TejidoCelula = () => {
    const [celulas, setCelulas] = useState(generarTejidoInicial());
    const [estaEjecutando, setEstaEjecutando] = useState(false);
    const [numGen, setNumGen] = useState(0);
    const [nombreBoton, setNombreBoton] = useState('Iniciar');

    useEffect(() => {
        let intervalo;

        if(estaEjecutando) {
            //cada 300 ms
            intervalo = setInterval(() => proximaGeneracion(), 300);
        } else {
            clearInterval(intervalo);
        }

        return () => clearInterval(intervalo);
    }, [estaEjecutando]);

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

    const contarVecinosVivos = (fila, col, tejido) => {
        let cantVecinos = 0;
        let iniI = 0;
        let finI = 3;
        let iniJ = 0;
        let finJ = 3;
    
        if(fila == 0) {
            //primera fila, no hay fila anterior
            iniI = 1;
        }
        if(fila+1 == tamanioTejido) {
            //ultima fila, no existe proxima fila
            finI = 2;
        }
        if(col == 0) {
            //primera columna, no hay columna anterior
            iniJ = 1;
        }
        if(col+1 == tamanioTejido) {
            //ultima columna, no existe proxima columna
            finJ = 2;
        }
    
        for(let i = iniI; i < finI; i++) {
            for(let j = iniJ; j < finJ; j++) {
                //buscamos todas las celulas excepto la actual
                if(i != 1 || j != 1) {
                    cantVecinos += tejido[fila-1+i][col-1+j];
                }
            }
        }
    
        return cantVecinos;
    };
    
    const proximaGeneracion = () => {
        setCelulas(celulasAntes => {
            const nuevasCelulas = celulasAntes.map(fila => [...fila]);

            for(let i = 0; i < tamanioTejido; i++) {
                for(let j = 0; j < tamanioTejido; j++) {
                    let vecinosVivos = contarVecinosVivos(i, j, celulasAntes);
        
                    if(celulasAntes[i][j] == 1) {
                        //celula esta viva
                        if(vecinosVivos > 3 || vecinosVivos < 2) {
                            //muere por sobrepoblacion o aislamiento
                            nuevasCelulas[i][j] = 0;
                        } else {
                            //contunua vivo
                            nuevasCelulas[i][j] = 1;
                        }
                    } else {
                        //celula esta muerta
                        if(vecinosVivos == 3) {
                            //revive
                            nuevasCelulas[i][j] = 1;
                        } else {
                            //continua muerto
                            nuevasCelulas[i][j] = 0;
                        }
                    }
                }
            }

            return nuevasCelulas;
        });
    
        setNumGen(numGenAntes => numGenAntes + 1);
    };

    const empezarJuego = () => {
        setEstaEjecutando(true);
        setNombreBoton('Pausar');
    }
    
    const pausarJuego = () => {
        setEstaEjecutando(false);
        setNombreBoton('Iniciar');
    }

    const resetearJuego = () => {
        if(estaEjecutando) {
            pausarJuego();
        }
    
        setNumGen(0);
    
        setCelulas(celulasAntes => {
            const nuevasCelulas = generarTejidoInicial();

            return nuevasCelulas;
        });
    }

    const jugar = () => {
        if(!estaEjecutando) {
            empezarJuego();
        } else {
            pausarJuego();
        }
    }

    return (
        <View>
            <View style={styles.contenedorCelulas}>
                {celulas.map((fila, i) => (
                    <View key={i} style={styles.fila}>
                        {fila.map((estado, j) => (
                            <Celula key={i*tamanioTejido+j}
                                estaViva={estado} onPress={() => actualizarCelula(i, j)}/>
                        ))}
                    </View>
                ))}
            </View>
            <View style={styles.contenedorBotones}>
                <BotonCelulas nombre={nombreBoton}
                    onPress={() => jugar()}/>
                <BotonCelulas nombre="Prox Gen"
                    onPress={() => proximaGeneracion()}/>
                <BotonCelulas nombre="Resetear"
                    onPress={() => resetearJuego()}/>
            </View>
            <InfoTejido texto={"Generación: "+numGen.toString()} />
        </View>
    );
};

export default TejidoCelula;