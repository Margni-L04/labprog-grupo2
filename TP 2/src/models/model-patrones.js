const fs = require('fs');

//la ruta es relativa al archivo "package.json"
const archivoPatrones = './public/json/ejemplos-patrones.json';

const obtenerJson = () => {
    //leemos el archivo que contiene todos los patrones
    const archPatrones = fs.readFileSync(archivoPatrones, 'utf-8');

    //transformamos el contenido a formato json
    const patronesJSON = JSON.parse(archPatrones);

    return patronesJSON;
};

const escribirJson = (patronesJSON) => {
    //transformamos el elemento en json a string
    const jsonData = JSON.stringify(patronesJSON);

    //reescribimos el nuevo elemento en el archivo json
    fs.writeFileSync(archivoPatrones, jsonData, 'utf-8');
};

const obtenerTipoPatron = (tipoPatron) => {
    //obtenemos el archivo que contiene todos los patrones en formato json
    const patronesJSON = obtenerJson();

    //buscamos el tipo de patron que tenga el mismo nombre que el pasado por parámetro
    const tipoPat = patronesJSON.find(tpat => tpat.nombre == tipoPatron);

    return tipoPat;
};

const obtenerPatronDeTipo = (nombPatron, tipoPatron) => {
    let patron = null;

    //buscamos el tipo de patron que tenga el mismo nombre que el pasado por parámetro
    const tipoPat = obtenerTipoPatron(tipoPatron);

    if(tipoPat) {
        //existe el tipo de patron pasado, guardamos el patron en la variable
        patron = (tipoPat.patrones).find(pat => pat.nombrePatron == nombPatron);
    }

    return patron;
};

const obtenerPatrones = (tipoPatron, cant, desde) => {
    let listaPatrones = null

    //buscamos el tipo de patron que tenga el mismo nombre que el pasado por parámetro
    const tipoPat = obtenerTipoPatron(tipoPatron);

    if(tipoPat) {
        //existe el tipo de patron pasado, extraemos los patrones segun lo indicado por los parametros
        listaPatrones = (tipoPat.patrones).slice(desde, desde + cant);
    }

    return listaPatrones;
};

const existeTipoPatron = (tipoPatron) => {
    let existe = false;

    //buscamos el tipo de patron que tenga el mismo nombre que el pasado por parámetro
    const tipoPat = obtenerTipoPatron(tipoPatron);

    if(tipoPat) {
        //existe el tipo de patron buscado
        existe = true;
    }

    return existe;
};

const existePatronEnTipo = (nombPatron, tipoPatron) => {
    let existe = false;

    //buscamos el tipo de patron que tenga el mismo nombre que el pasado por parámetro
    const tipoPat = obtenerTipoPatron(tipoPatron);

    if(tipoPat) {
        //existe el tipo de patron pasado, buscamos si existe algun patron en este tipo
        const patron = (tipoPat.patrones).find(pat => pat.nombrePatron == nombPatron);

        if(patron) {
            //existe un patron con el nombre pasado en este tipo de patron
            existe = true;
        }
    }

    return existe;
};

const agregarPatronEnTipo = (nuevoPatron, tipoPatron) => {
    //obtenemos el archivo que contiene todos los patrones en formato json
    const patronesJSON = obtenerJson();

    //buscamos el tipo de patron que tenga el mismo nombre que el pasado por parámetro
    const tipoPat = patronesJSON.find(tpat => tpat.nombre == tipoPatron);

    if(tipoPat) {
        //existe el tipo de patron pasado, lo agregamos al final de la lista de patrones
        (tipoPat.patrones).push(nuevoPatron);

        //reescribimos la nueva lista de nuevo en el archivo json
        escribirJson(patronesJSON);
    }
};

const cambiarImagenDePatronEnTipo = (nombPatron, tipoPatron, nuevaImagen) => {
    //obtenemos el archivo que contiene todos los patrones en formato json
    const patronesJSON = obtenerJson();

    //buscamos el tipo de patron que tenga el mismo nombre que el pasado por parámetro
    const tipoPat = patronesJSON.find(tpat => tpat.nombre == tipoPatron);

    if(tipoPat) {
        //existe el tipo de patron pasado, guardamos el patron en la variable
        const patron = (tipoPat.patrones).find(pat => pat.nombrePatron == nombPatron);

        if(patron) {
            //existe un patron en este tipo con el nombre pasado, modificamos la imagen del patron
            patron.imagen = nuevaImagen;

            //reescribimos la nueva lista de nuevo en el archivo json
            escribirJson(patronesJSON);
        }
    }
};

module.exports = {obtenerJson, obtenerTipoPatron, obtenerPatronDeTipo, obtenerPatrones, 
    existeTipoPatron, existePatronEnTipo, agregarPatronEnTipo, cambiarImagenDePatronEnTipo};