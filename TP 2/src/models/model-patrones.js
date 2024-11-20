const fs = require('fs');

const obtenerJson = () => {
    //leemos el archivo que contiene todos los patrones
    const archPatrones = fs.readFileSync('./public/json/ejemplos-patrones.json', 'utf-8');

    //transformamos el contenido a formato json
    const patronesJSON = JSON.parse(archPatrones);

    return patronesJSON;
}

const obtenerTipoPatron = (tipoPatron) => {
    //obtenemos el archivo que contiene todos los patrones en formato json
    const patronesJSON = obtenerJson();

    //buscamos el tipo de patron que tenga el mismo nombre que el pasado por parámetro
    const tipoPat = patronesJSON.find(tpat => tpat.nombre == tipoPatron);

    return tipoPat;
}

const existeTipoPatron = (tipoPatron) => {
    let existe = true;

    //buscamos el tipo de patron que tenga el mismo nombre que el pasado por parámetro
    const tipoPat = obtenerTipoPatron(tipoPatron);

    if(!tipoPat) {
        //no existe el tipo de patron buscado
        existe = false;
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

        //transformamos la nueva lista de patrones a formato string
        const jsonData = JSON.stringify(patronesJSON);

        //reescribimos la nueva lista de nuevo en el archivo json ejemplos-patrones (la ruta es relativa al archivo "package.json")
        fs.writeFileSync('public/json/ejemplos-patrones.json', jsonData, 'utf-8');
    }
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
}

const obtenerPatronDeTipo = (nombPatron, tipoPatron) => {
    let patron = null;

    //buscamos el tipo de patron que tenga el mismo nombre que el pasado por parámetro
    const tipoPat = obtenerTipoPatron(tipoPatron);

    if(tipoPat) {
        //existe el tipo de patron pasado, guardamos el patron en la variable
        patron = (tipoPat.patrones).find(pat => pat.nombrePatron == nombPatron);
    }

    return patron;
}

const cambiarImagenDePatronEnTipo = (nombPatron, tipoPatron, nuevaImagen) => {
    //obtenemos el archivo que contiene todos los patrones en formato json
    const patronesJSON = obtenerJson();

    //buscamos el tipo de patron que tenga el mismo nombre que el pasado por parámetro
    const tipoPat = patronesJSON.find(tpat => tpat.nombre == tipoPatron);

    if(tipoPat) {
        //existe el tipo de patron pasado, guardamos el patron en la variable
        patron = (tipoPat.patrones).find(pat => pat.nombrePatron == nombPatron);

        if(patron) {
            //existe un patron en este tipo con el nombre pasado, modificamos la imagen del patron
            patron.imagen = nuevaImagen;

            //transformamos la nueva lista de patrones a formato string
            const jsonData = JSON.stringify(patronesJSON);

            //reescribimos la nueva lista de nuevo en el archivo json ejemplos-patrones (la ruta es relativa al archivo "package.json")
            fs.writeFileSync('public/json/ejemplos-patrones.json', jsonData, 'utf-8');
        }
    }
};


module.exports = {obtenerJson, obtenerTipoPatron, existeTipoPatron, existePatronEnTipo,
    agregarPatronEnTipo, obtenerPatrones, obtenerPatronDeTipo, cambiarImagenDePatronEnTipo};