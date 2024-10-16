/* Creamos dinámicamente el footer con las cuentas de git */
const cuentasGit = document.getElementById("sobre-nosotros");
const arrCuentasGit = [
    //[ Link cuenta Git, Nombre cuenta Git ]
    {link:"https://github.com/Margni-L04", nombre:"Lucas"},
    {link:"https://github.com/valenvii", nombre:"Vale"},
    {link:"https://github.com/paulacoronel0", nombre:"Pau"},
    {link:"https://github.com/Ignacio1706", nombre:"Mendi"}
];

/*
Crearemos HTMLs de la forma

<div class="cuenta-git">
    <a href="link cuenta git" class="link-git"><i class="fa-brands fa-github"></i></a>
    <p class="nombre-git">nombre cuenta git</p>
</div>
*/

arrCuentasGit.forEach(cuenta => {
    /* Nivel 0 */
    let git = document.createElement("div");
    git.classList.add("cuenta-git");
    cuentasGit.appendChild(git);

    /* Nivel 1 */
    let linkGit = document.createElement("a");
    linkGit.classList.add("link-git");
    linkGit.href = cuenta.link;
    git.appendChild(linkGit);

    /* Nivel 2 */
    let imagenGit = document.createElement("i");
    imagenGit.classList.add("fa-brands");
    imagenGit.classList.add("fa-github");
    linkGit.appendChild(imagenGit);

    /* Nivel 1 */
    let nombreGit = document.createElement("p");
    nombreGit.classList.add("nombre-git");
    nombreGit.innerHTML = cuenta.nombre;
    git.appendChild(nombreGit);
});