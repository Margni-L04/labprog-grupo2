/* Invertir la imagen al pasar por encima */
const logo = document.getElementById('logo');

logo.addEventListener('mouseenter', () => {
    logo.src = '../img/logoInvertido.png';
});

logo.addEventListener('mouseleave', () => {
    logo.src = '../img/logo.png';
});