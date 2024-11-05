/* Creamos dinámicamente las flip-cards de los tipos de patrones */
const containerTiposPatrones = document.getElementById("cards-patrones");

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

//solo funciona con servidor activo
fetch('../json/tipos-patrones.json')
  .then(response => response.json())
  .then(data => crearTiposPatrones(data))
  .catch(error => console.error('Hubo un problema con la petición fetch:', error));

function crearTiposPatrones(tiposPatrones) {
    tiposPatrones.forEach(patron => {
        /* Nivel 0 */
        let cardTipoPatron = document.createElement("div");
        cardTipoPatron.classList.add("tipo-patron");
        cardTipoPatron.addEventListener("click", () => {
            cardTipoPatron.classList.toggle("flipped");
        });
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
}

/* ------------------------------------------------------------------------------------------ */

/* Creamos dinámicamente cada slider de patrón con ejemplos de cada uno */
const seccionPatrones = document.getElementById("seccion-patrones");

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

//solo funciona con servidor activo
fetch('../json/ejemplos-patrones.json')
  .then(response => response.json())
  .then(data => crearEjemplosPatrones(data))
  .catch(error => console.error('Hubo un problema con la petición fetch:', error));

function crearEjemplosPatrones(ejemplosPatrones) {
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
}