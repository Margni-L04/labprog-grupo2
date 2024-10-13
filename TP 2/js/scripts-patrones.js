/* Creamos dinámicamente las flip-cards de los tipos de patrones */
const containerTiposPatrones = document.getElementById("cards-patrones");
const arrTiposPatrones = [
    //[ Nombre tipo patrón, URL a la imagen, Descripción de tipo patrón ]
    ["Vidas Estáticas", "../img/estatico-sapo.png", "Son patrones que se mantienen igual a través del tiempo <br/> No cambian de una generación a la siguiente"],
    ["Oscilantes", "../gifs/oscilante-palito.gif", "Tras un número finito de generaciones vuelven a su estado inicial <br/> Funcionan en ciclos de n-periodos"],
    ["Matusalenes", "../img/matusalen-diehard.png", "Pueden evolucionar a lo largo de muchos turnos, o generaciones, antes de estabilizarse <br/> Es decir, que quedarán únicamente patrones estáticos u oscilantes (o mueren todas las células)"],
    ["Naves Espaciales", "../gifs/glider.gif", "Tras un número finito de generaciones vuelven a su estado original pero en una ubicación diferente <br/> Avanzan infinitamente por toda la grilla"]
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

/* Evento para ver información de las cards de los tipos de patrones al hacer click */
const patronesCards = document.querySelectorAll(".tipo-patron");

patronesCards.forEach(patron => {
    patron.addEventListener("click", () => {
        patron.classList.toggle("flipped");
    });
});