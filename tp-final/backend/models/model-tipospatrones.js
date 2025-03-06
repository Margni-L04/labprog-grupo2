const fs = require('fs');

//la ruta es relativa al archivo "package.json"
const archivoTiposPatrones = './backend/json/tipos-patrones.json';

const obtenerJson = () => {
    //leemos el archivo que contiene todos los tipos de patrones
    const archTiposPatrones = fs.readFileSync(archivoTiposPatrones, 'utf-8');

    //transformamos el contenido a formato json
    const tipospatronesJSON = JSON.parse(archTiposPatrones);

    return tipospatronesJSON;
};

module.exports = {obtenerJson};