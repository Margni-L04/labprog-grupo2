/* Evento para ver información de las cards de los tipos de patrones al hacer click */
const patronesCards = document.querySelectorAll(".tipo-patron");

patronesCards.forEach(patron => {
    patron.addEventListener("click", () => {
        patron.classList.toggle("flipped");
    });
});