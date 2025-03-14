import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, FlatList } from 'react-native';

//componentes
import Celula from '../Celula/Celula';
import BotonCelulas from '../BotonCelulas/BotonCelulas';
import InfoTejido from '../InfoTejido/InfoTejido';

//estilos
import styles from './styles';

const filasTejido = 10;
const colsTejido = 10;
/*const filasTejido = Math.floor(Dimensions.get('window').height/30);
const colsTejido = Math.floor(Dimensions.get('window').width/20);*/

const generarTejidoInicial = () => {
    //generamos la matriz inicial con todas las células en 0 (muertas)
    return Array(filasTejido)
        .fill(0)
        .map(() => Array(colsTejido).fill(0));
};

const TejidoCelula = () => {
    const [celulas, setCelulas] = useState(generarTejidoInicial());
    const [estaEjecutando, setEstaEjecutando] = useState(false);
    const [numGen, setNumGen] = useState(0);
    const [nombreBoton, setNombreBoton] = useState('Iniciar');

    //cuando se modifica el estado "estaEjecutando", empezamos o eliminamos el intervalo
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
        //revisamos los vecinos en la célula de la posición pasada, en el tejido dado
        let cantVecinos = 0;
        let iniI = 0;
        let finI = 3;
        let iniJ = 0;
        let finJ = 3;
    
        if(fila == 0) {
            //primera fila, no hay fila anterior
            iniI = 1;
        }
        if(fila+1 == filasTejido) {
            //ultima fila, no existe proxima fila
            finI = 2;
        }
        if(col == 0) {
            //primera columna, no hay columna anterior
            iniJ = 1;
        }
        if(col+1 == colsTejido) {
            //ultima columna, no existe proxima columna
            finJ = 2;
        }
    
        for(let i = iniI; i < finI; i++) {
            for(let j = iniJ; j < finJ; j++) {
                //buscamos en todas las celulas excepto en la actual
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

            for(let i = 0; i < filasTejido; i++) {
                for(let j = 0; j < colsTejido; j++) {
                    let vecinosVivos = contarVecinosVivos(i, j, celulasAntes);
        
                    if(celulasAntes[i][j] == 1) {
                        //celula esta viva
                        if(vecinosVivos > 3 || vecinosVivos < 2) {
                            //muere por sobrepoblacion o aislamiento
                            nuevasCelulas[i][j] = 0;
                        } else {
                            //contunua viva
                            nuevasCelulas[i][j] = 1;
                        }
                    } else {
                        //celula esta muerta
                        if(vecinosVivos == 3) {
                            //revive
                            nuevasCelulas[i][j] = 1;
                        } else {
                            //continua muerta
                            nuevasCelulas[i][j] = 0;
                        }
                    }
                }
            }

            return nuevasCelulas;
        });
    
        setNumGen(numGenAntes => numGenAntes + 1);
    };

    //acción para comenzar el juego
    const empezarJuego = async () => {
        setEstaEjecutando(true);
        setNombreBoton('Pausar');
    }
    
    //acción para pausar el juego que comenzó
    const pausarJuego = () => {
        setEstaEjecutando(false);
        setNombreBoton('Iniciar');
    }

    //acción para volver al estado inicial
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

    const renderFilasCelulas = ({item, index}) => (
        <View style={styles.fila}>
            {item.map((estado, j) => (
                <Celula key={filasTejido+j}
                    estaViva={estado}
                    onPress={() => actualizarCelula(index, j)}/>
            ))}
        </View>
    );

    return (
        <ScrollView>
            <View style={styles.contenedorInfo}>
                <InfoTejido texto={`Generación: ${numGen}`} />
            </View>
            <View>
                <FlatList
                    data={celulas}
                    renderItem={renderFilasCelulas}
                    keyExtractor={(item, index) => `fila-${index}`}
                    contentContainerStyle={styles.contenedorCelulas}
                    scrollEnabled={false} />
            </View>
            <View style={styles.contenedorBotones}>
                <BotonCelulas nombre={nombreBoton}
                    onPress={() => jugar()}/>
                <BotonCelulas nombre="Prox Gen"
                    onPress={() => proximaGeneracion()}/>
                <BotonCelulas nombre="Resetear"
                    onPress={() => resetearJuego()}/>
            </View>
        </ScrollView>
    );
};

export default TejidoCelula;