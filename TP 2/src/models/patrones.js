const fs = require('fs');

const existeTipoPatron = (tipoPatron) => {
    let existe = true;

    //leemos el archivo que contiene los patrones a buscar
    const archPatrones = fs.readFileSync('./public/json/ejemplos-patrones.json', 'utf-8');

    //transformamos el contenido a formato json
    const patronesJSON = JSON.parse(archPatrones);

    //buscamos el tipo de patron que tenga el mismo nombre que el pasado por parámetro
    const tipoPat = patronesJSON.find(tpat => tpat.nombre == tipoPatron);

    if(!tipoPat) {
        //no existe el tipo de patron buscado
        existe = false;
    }

    return existe;
};

const existePatronEnTipo = (nombPatron, tipoPatron) => {
    let existe = false;

    //leemos el archivo que contiene los patrones a buscar
    const archPatrones = fs.readFileSync('./public/json/ejemplos-patrones.json', 'utf-8');

    //transformamos el contenido a formato json
    const patronesJSON = JSON.parse(archPatrones);

    //buscamos el tipo de patron que tenga el mismo nombre que el pasado por parámetro
    const tipoPat = patronesJSON.find(tpat => tpat.nombre == tipoPatron);

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
    //leemos el archivo que contiene los patrones a buscar
    const archPatrones = fs.readFileSync('./public/json/ejemplos-patrones.json', 'utf-8');

    //transformamos el contenido a formato json
    const patronesJSON = JSON.parse(archPatrones);

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


module.exports = {existeTipoPatron, existePatronEnTipo, agregarPatronEnTipo};