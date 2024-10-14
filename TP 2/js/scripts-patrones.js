/* Creamos dinámicamente las flip-cards de los tipos de patrones */
const containerTiposPatrones = document.getElementById("cards-patrones");
const arrTiposPatrones = [
    //[ Nombre tipo patrón, URL a la imagen, Descripción de tipo patrón ... ]
    ["Vidas Estáticas", "../img/estatico-flor.png", "Son patrones que se mantienen igual a través del tiempo <br/> No cambian de una generación a la siguiente"],
    ["Oscilantes", "../gifs/oscilante-palito.gif", "Tras un número finito de generaciones vuelven a su estado inicial <br/> Funcionan en ciclos de n-periodos"],
    ["Matusalenes", "../img/matusalen-diehard.png", "Pueden evolucionar a lo largo de muchos turnos, o generaciones, antes de estabilizarse <br/> Es decir, que quedarán únicamente patrones estáticos u oscilantes (o mueren todas las células)"],
    ["Naves Espaciales", "../gifs/nave-glider.gif", "Tras un número finito de generaciones vuelven a su estado original pero en una ubicación diferente <br/> Avanzan infinitamente por toda la grilla"]
];

/* Crearemos un html de la forma por cada tipo de patron:

<div class="tipo-patron">
    <div class="tipo-patron-frente">
        <h2 class="titulo-patron">Nombre de tipo de patrón</h2>
        <img src="linkImagen" class="img-gif-card">
    </div>
    <div class="tipo-patron-atras">
        <p class="texto-info">
            Info sobre el tipo de patron
        </p>
    </div>
</div>

*/

arrTiposPatrones.forEach(patron => {
    /* Nivel 0 */
    let cardTipoPatron = document.createElement("div");
    cardTipoPatron.classList.add("tipo-patron");
    containerTiposPatrones.appendChild(cardTipoPatron);

    /* Nivel 1 */
    let cardFrente = document.createElement("div");
    cardFrente.classList.add("tipo-patron-frente");
    cardTipoPatron.appendChild(cardFrente);

    /* Nivel 2 */
    let tituloPatron = document.createElement("h2");
    tituloPatron.classList.add("titulo-patron");
    tituloPatron.innerHTML = patron[0];
    cardFrente.appendChild(tituloPatron);

    /* Nivel 2 */
    let imagenPatron = document.createElement("img");
    imagenPatron.src = patron[1];
    imagenPatron.classList.add("img-gif-card");
    cardFrente.appendChild(imagenPatron);

    /* Nivel 1 */
    let cardAtras = document.createElement("div");
    cardAtras.classList.add("tipo-patron-atras");
    cardTipoPatron.appendChild(cardAtras);

    /* Nivel 2 */
    let textoInfo = document.createElement("p");
    textoInfo.classList.add("texto-info");
    textoInfo.innerHTML = patron[2];
    cardAtras.appendChild(textoInfo);
});

/* ------------------------------------------------------------------------------------------ */

/* Creamos dinámicamente cada slider de patrón con ejemplos de cada uno */
const seccionPatrones = document.getElementById("seccion-patrones");
const arrEjemplosPatrones = [
    //[ Nombre tipo patrón, [ URL de patrón, Nombre patrón ... ] ... ]
    ["Vidas Estáticas", [ ["../img/estatico-bloque.png", "Bloque"],
        ["../img/estatico-pan.png", "Pan"],
        ["../img/estatico-flor.png", "Flor"],
        ["../img/estatico-bote.png", "Bote"],
        ["../img/estatico-colmena.png", "Colmena"]
    ] ],
    ["Oscilantes", [ ["../gifs/oscilante-palito.gif", "Palito"],
        ["../gifs/oscilante-sol.gif", "Sol"],
        ["../gifs/oscilante-tornado.gif", "Tornado"],
        ["../gifs/oscilante-ocho.gif", "Ocho"],
        ["../gifs/oscilante-cena.gif", "Cena"]
    ] ],
    ["Matusalenes", [ ["../img/matusalen-diehard.png", "Diehard"],
        ["../img/matusalen-pistola.png", "Pistola"],
        ["../img/matusalen-pi.png", "Pi"],
        ["../img/matusalen-tetris.png", "Tetris"],
        ["../img/matusalen-bheptomino.png", "B-Heptomino"]
    ] ],
    ["Naves Espaciales", [ ["../gifs/nave-glider.gif", "Glider"],
        ["../gifs/nave-pajaro.gif", "Pájaro"],
        ["../gifs/nave-cara.gif", "Cara"],
        ["../gifs/nave-58P5H1V1.gif", "58P5H1V1"],
        ["../gifs/nave-loafer.gif", "Loafer"],
    ] ],
    ["Generadores de naves", [ ["../gifs/glider-gun.gif", "Glider Gun"],
        ["../gifs/super-glider-gun.gif", "Super-Glider Gun"]
    ] ]
];

/* Crearemos un html de la forma por cada patron:

<div class="slider-patron">
    <h2 class="titulo-patron">Nombre tipo patrón</h2>        
    <div class="patron-imagenes">
        <ul class="lista-ejemplos-patron">
            <li class="item-ejemplos-patron">
                <img src="URL imagen/div" class="item-imagen">
                <p class="nombre-patron">Nombre patrón</p>
            </li>
            <li class="item-ejemplos-patron">
                <img src="URL imagen/div" class="item-imagen">
                <p class="nombre-patron">Nombre patrón</p>
            </li>
            ...
        </ul>
    </div>
</div>

*/

arrEjemplosPatrones.forEach(patron => {
    /* Nivel 0 */
    let sliderPatron = document.createElement("div");
    sliderPatron.classList.add("slider-patron");
    seccionPatrones.appendChild(sliderPatron);

    /* Nivel 1 */
    let tituloPatron = document.createElement("h2");
    tituloPatron.classList.add("titulo-patron");
    tituloPatron.innerHTML = patron[0];
    sliderPatron.appendChild(tituloPatron);

    /* Nivel 1 */
    let imagenesPatron = document.createElement("div");
    imagenesPatron.classList.add("patron-imagenes");
    sliderPatron.appendChild(imagenesPatron);

    /* Nivel 2 */
    let listaPatrones = document.createElement("ul");
    listaPatrones.classList.add("lista-ejemplos-patron");
    imagenesPatron.appendChild(listaPatrones);

    /* Nivel 3 - Creación de cada elemento de la lista */
    patron[1].forEach(ejemploPatron => {
        let itemPatron = document.createElement("li");
        itemPatron.classList.add("item-ejemplos-patron");
        listaPatrones.appendChild(itemPatron);

        /* Nivel 4 */
        let imagenEjemploPatron = document.createElement("img");
        imagenEjemploPatron.classList.add("item-imagen");
        imagenEjemploPatron.src = ejemploPatron[0];
        itemPatron.appendChild(imagenEjemploPatron);

        /* Nivel 4 */
        let nombreEjemploPatron = document.createElement("p");
        nombreEjemploPatron.classList.add("nombre-patron");
        nombreEjemploPatron.innerHTML = ejemploPatron[1];
        itemPatron.appendChild(nombreEjemploPatron);
    });
});

/* ------------------------------------------------------------------------------------------ */

/* Evento para ver información de las cards de los tipos de patrones al hacer click */
const patronesCards = document.querySelectorAll(".tipo-patron");

patronesCards.forEach(patron => {
    patron.addEventListener("click", () => {
        patron.classList.toggle("flipped");
    });
});