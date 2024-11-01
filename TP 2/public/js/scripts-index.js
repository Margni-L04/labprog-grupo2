const patronesCards = document.querySelectorAll(".tipo-patron");

patronesCards.forEach(patron => {
    patron.addEventListener("click", () => {
        patron.classList.toggle("flipped");
    });
});