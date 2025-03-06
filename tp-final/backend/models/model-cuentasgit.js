const fs = require('fs');

//la ruta es relativa al archivo "package.json"
const archivoCuentasGit = './backend/json/cuentas-git.json';

const obtenerJson = () => {
    //leemos el archivo que contiene todas las cuentas de github
    const archCuentasGit = fs.readFileSync(archivoCuentasGit, 'utf-8');

    //transformamos el contenido a formato json
    const cuentasGitJSON = JSON.parse(archCuentasGit);

    return cuentasGitJSON;
};

module.exports = {obtenerJson};