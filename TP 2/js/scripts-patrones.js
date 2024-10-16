/* Creamos dinámicamente las flip-cards de los tipos de patrones */
const containerTiposPatrones = document.getElementById("cards-patrones");
const tiposPatrones = [
    {nombre:"Vidas Estáticas", imagen:"../img/estatico-flor.png", descripcion:"Son patrones que se mantienen igual a través del tiempo <br/> No cambian de una generación a la siguiente"},
    {nombre:"Oscilantes", imagen:"../gifs/oscilante-palito.gif", descripcion:"Tras un número finito de generaciones vuelven a su estado inicial <br/> Funcionan en ciclos de n-periodos"},
    {nombre:"Matusalenes", imagen:"../img/matusalen-diehard.png", descripcion:"Pueden evolucionar a lo largo de muchos turnos, o generaciones, antes de estabilizarse <br/> Es decir, que quedarán únicamente patrones estáticos u oscilantes (o mueren todas las células)"},
    {nombre:"Naves Espaciales", imagen:"../gifs/nave-glider.gif", descripcion:"Tras un número finito de generaciones vuelven a su estado original pero en una ubicación diferente <br/> Avanzan infinitamente por toda la grilla"}
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

tiposPatrones.forEach(patron => {
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
    tituloPatron.innerHTML = patron.nombre;
    cardFrente.appendChild(tituloPatron);

    /* Nivel 2 */
    let imagenPatron = document.createElement("img");
    imagenPatron.src = patron.imagen;
    imagenPatron.classList.add("img-gif-card");
    cardFrente.appendChild(imagenPatron);

    /* Nivel 1 */
    let cardAtras = document.createElement("div");
    cardAtras.classList.add("tipo-patron-atras");
    cardTipoPatron.appendChild(cardAtras);

    /* Nivel 2 */
    let textoInfo = document.createElement("p");
    textoInfo.classList.add("texto-info");
    textoInfo.innerHTML = patron.descripcion;
    cardAtras.appendChild(textoInfo);
});

/* ------------------------------------------------------------------------------------------ */

/* Creamos dinámicamente cada slider de patrón con ejemplos de cada uno */
const seccionPatrones = document.getElementById("seccion-patrones");
const ejemplosPatrones = [
    //[ Nombre tipo patrón, [ URL de patrón, Nombre patrón ... ] ... ]
    {nombre:"Vidas Estáticas", patrones:[ {imagen:"../img/estatico-bloque.png", nombrePatron:"Bloque"},
        {imagen:"../img/estatico-pan.png", nombrePatron:"Pan"},
        {imagen:"../img/estatico-flor.png", nombrePatron:"Flor"},
        {imagen:"../img/estatico-bote.png", nombrePatron:"Bote"},
        {imagen:"../img/estatico-colmena.png", nombrePatron:"Colmena"}
    ] },
    {nombre:"Oscilantes", patrones:[ {imagen:"../gifs/oscilante-palito.gif", nombrePatron:"Palito"},
        {imagen:"../gifs/oscilante-sol.gif", nombrePatron:"Sol"},
        {imagen:"../gifs/oscilante-tornado.gif", nombrePatron:"Tornado"},
        {imagen:"../gifs/oscilante-ocho.gif", nombrePatron:"Ocho"},
        {imagen:"../gifs/oscilante-cena.gif", nombrePatron:"Cena"}
    ] },
    {nombre:"Matusalenes", patrones:[ {imagen:"../img/matusalen-diehard.png", nombrePatron:"Diehard"},
        {imagen:"../img/matusalen-pistola.png", nombrePatron:"Pistola"},
        {imagen:"../img/matusalen-pi.png", nombrePatron:"Pi"},
        {imagen:"../img/matusalen-tetris.png", nombrePatron:"Tetris"},
        {imagen:"../img/matusalen-bheptomino.png", nombrePatron:"B-Heptomino"}
    ] },
    {nombre:"Naves Espaciales", patrones:[ {imagen:"../gifs/nave-glider.gif", nombrePatron:"Glider"},
        {imagen:"../gifs/nave-pajaro.gif", nombrePatron:"Pájaro"},
        {imagen:"../gifs/nave-cara.gif", nombrePatron:"Cara"},
        {imagen:"../gifs/nave-58P5H1V1.gif", nombrePatron:"58P5H1V1"},
        {imagen:"../gifs/nave-loafer.gif", nombrePatron:"Loafer"}
    ] },
    {nombre:"Generadores de naves", patrones:[ {imagen:"../gifs/glider-gun.gif", nombrePatron:"Glider Gun"},
        {imagen:"../gifs/super-glider-gun.gif", nombrePatron:"Super-Glider Gun"}
    ] },
    {nombre:"Logic Gates", patrones:[ {imagen:"../gifs/logic-gate-not-1.gif", nombrePatron:"NOT (IN:1)"},
        {imagen:"../gifs/logic-gate-not-0.gif", nombrePatron:"NOT (IN:0)"},
        {imagen:"../gifs/logic-gate-and-00.gif", nombrePatron:"AND (IN:0,0)"},
        {imagen:"../gifs/logic-gate-and-01.gif", nombrePatron:"AND (IN:0,1)"},
        {imagen:"../gifs/logic-gate-and-10.gif", nombrePatron:"AND (IN:1,0)"},
        {imagen:"../gifs/logic-gate-and-11.gif", nombrePatron:"AND (IN:1,1)"}
    ] }
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

ejemplosPatrones.forEach(tipoPatron => {
    /* Nivel 0 */
    let sliderPatron = document.createElement("div");
    sliderPatron.classList.add("slider-patron");
    seccionPatrones.appendChild(sliderPatron);

    /* Nivel 1 */
    let tituloPatron = document.createElement("h2");
    tituloPatron.classList.add("titulo-patron");
    tituloPatron.innerHTML = tipoPatron.nombre;
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
    (tipoPatron.patrones).forEach(ejemploPatron => {
        let itemPatron = document.createElement("li");
        itemPatron.classList.add("item-ejemplos-patron");
        listaPatrones.appendChild(itemPatron);

        /* Nivel 4 */
        let imagenEjemploPatron = document.createElement("img");
        imagenEjemploPatron.classList.add("item-imagen");
        imagenEjemploPatron.src = ejemploPatron.imagen;
        itemPatron.appendChild(imagenEjemploPatron);

        /* Nivel 4 */
        let nombreEjemploPatron = document.createElement("p");
        nombreEjemploPatron.classList.add("nombre-patron");
        nombreEjemploPatron.innerHTML = ejemploPatron.nombrePatron;
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