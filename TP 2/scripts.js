/* Invertir la imagen al pasar por encima */
const logo = document.getElementById('logo');

logo.addEventListener('mouseenter', () => {
    logo.src = 'logoInvertido.png';
});

logo.addEventListener('mouseleave', () => {
    logo.src = 'logo.png';
});

/* Cambio del color del cuadrado de blanco a negro al hacer click */
const boton = document.getElementById('boton');
let estaVivo = true;

boton.addEventListener('click', () => {
    if(estaVivo) {
        //esta vivo, lo matamos
        boton.style.backgroundColor = 'black';
    } else {
        //esta muerto, revive
        boton.style.backgroundColor = 'white';
    }
    estaVivo = !estaVivo;
});