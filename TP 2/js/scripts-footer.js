/* Creamos dinámicamente el footer con las cuentas de git */
const cuentasGit = document.getElementById("sobre-nosotros");

/*
Crearemos un html de la forma
<div class="cuenta-git">
    <a href="link cuenta git" class="link-git"><i class="fa-brands fa-github"></i></a>
    <p class="nombre-git">nombre cuenta git</p>
</div>
*/

//solo funciona con servidor activo
fetch('../json/cuentas-git.json')
  .then(response => response.json())
  .then(data => crearCuentasGit(data))
  .catch(error => console.error('Hubo un problema con la petición fetch:', error));

function crearCuentasGit(arrCuentasGit) {
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
}