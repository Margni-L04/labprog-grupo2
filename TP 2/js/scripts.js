/* Invertir la imagen al pasar por encima */
const logo = document.getElementById('logo');

logo.addEventListener('mouseenter', () => {
    logo.src = 'imagenes/logoInvertido.png';
});

logo.addEventListener('mouseleave', () => {
    logo.src = 'imagenes/logo.png';
});

/*-----------------------------------------------------------------*/

/* Datos de la grilla */
const textoNumGen = document.getElementById("numGen");
const tamanioGrid = 95;
let grid = crearGrid(tamanioGrid);
let estaEjecutando = false;
let intervalo;
let numGen = 0;

/* Inicializar la grilla */
function crearGrid(tamGrid) {
    let grid = [];
    const gridElem = document.getElementById("grid");
    gridElem.innerHTML = '';

    for (let fila = 0; fila < tamGrid; fila++) {
        grid[fila] = [];
        for (let col = 0; col < tamGrid; col++) {
            let celula = document.createElement("div");
            celula.classList.add("celula");
            celula.addEventListener("click", () => cambiarEstado(fila, col));
            gridElem.appendChild(celula);
            grid[fila][col] = 0;
        }
    }

    return grid;
}

/* Actualizar la grilla */
function updateGrid() {
    const celulas = document.getElementsByClassName("celula");
    let cont = 0;
    for (let i = 0; i < tamanioGrid; i++) {
        for (let j = 0; j < tamanioGrid; j++) {
            celulas[cont].classList.toggle("alive", grid[i][j] === 1);
            cont++;
        }
    }
}

/* Cambio del estado de la celula */
function cambiarEstado(fila, col) {
    if(grid[fila][col] == 1) {
        grid[fila][col] = 0;
    } else {
        grid[fila][col] = 1;
    }
    updateGrid();
}

/* Contar la cantidad de vecinos que tiene una celula  */
function contarVecinosVivos(fila, col) {
    let cantVecinos = 0;
    let iniI = 0;
    let finI = 3;
    let iniJ = 0;
    let finJ = 3;

    if(fila == 0) {
        //primera fila, no hay fila anterior
        iniI = 1;
    }
    if(fila+1 == tamanioGrid) {
        //ultima fila, no existe proxima fila
        finI = 2;
    }
    if(col == 0) {
        //primera columna, no hay columna anterior
        iniJ = 1;
    }
    if(col+1 == tamanioGrid) {
        //ultima columna, no existe proxima columna
        finJ = 2;
    }

    for(let i = iniI; i < finI; i++) {
        for(let j = iniJ; j < finJ; j++) {
            //buscamos todas las celulas excepto la actual
            if(i != 1 || j != 1) {
                cantVecinos += grid[fila-1+i][col-1+j];
            }
        }
    }

    return cantVecinos;
}

/* Crear proxima generacion */
function proximaGeneracion() {
    let nuevoGrid = crearGrid(tamanioGrid);
    for(let i = 0; i < tamanioGrid; i++) {
        for(let j = 0; j < tamanioGrid; j++) {
            let vecinosVivos = contarVecinosVivos(i, j);

            if(grid[i][j] == 1) {
                //celula esta viva
                if(vecinosVivos > 3 || vecinosVivos < 2) {
                    //muere por sobrepoblacion o aislamiento
                    nuevoGrid[i][j] = 0;
                } else {
                    //contunua vivo
                    nuevoGrid[i][j] = 1;
                }
            } else {
                //celula esta muerta
                if(vecinosVivos == 3) {
                    //revive
                    nuevoGrid[i][j] = 1;
                } else {
                    //continua muerto
                    nuevoGrid[i][j] = 0;
                }
            }
        }
    }

    numGen++;
    grid = nuevoGrid;
    updateGrid();

    //actualizamos también el contador visual del juego
    textoNumGen.innerHTML = "Generación: " + numGen;
}

/*-----------------------------------------------------------------*/

/* Acciones sobre el juego */
const botonInicio = document.getElementById("botonInicio");
const botonProxGen = document.getElementById("botonProxGen");
const botonReseteo = document.getElementById("botonReseteo");

function empezarJuego() {
    estaEjecutando = true;
    
    //cada 100 ms
    intervalo = setInterval(proximaGeneracion, 100);

    //inactivar el boton de proxGen
    botonProxGen.classList.add("inactivo");
}

function pausarJuego() {
    clearInterval(intervalo);
    estaEjecutando = false;

    //reactivar el boton de proxGen
    botonProxGen.classList.remove("inactivo");
}

function siguienteGeneracion() {
    //solo podemos ir al proximo paso si el juego está pausado
    if(!estaEjecutando) {
        proximaGeneracion();
    }
}

function resetearJuego() {
    if(estaEjecutando) {
        pausarJuego();
        botonInicio.innerHTML = 'Iniciar';
    }

    numGen = 0;
    textoNumGen.innerHTML = "Generación: " + numGen;

    grid = crearGrid(tamanioGrid);
    updateGrid();
}

botonInicio.addEventListener("click", () => {
    if(!estaEjecutando) {
        empezarJuego();
        botonInicio.innerHTML = 'Pausar';
    } else {
        pausarJuego();
        botonInicio.innerHTML = 'Iniciar';
    }
});

botonProxGen.addEventListener("click", () => {
    siguienteGeneracion();
});

botonReseteo.addEventListener("click", () => {
    resetearJuego();
});