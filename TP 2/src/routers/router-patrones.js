const express = require('express');
const router = express.Router();

const {obtenerTipoPatron, obtenerJson, existeTipoPatron, existePatronEnTipo,
    agregarPatronEnTipo, obtenerPatrones, obtenerPatronDeTipo} = require('./../models/model-patrones.js');

//le decimos a express que vamos a usar json
router.use(express.json());

//get de todo el arreglo de los patrones
router.get('/', (req, res) => {
    //obtenemos el json con todos los datos y lo devolvemos
    const patronesJSON = obtenerJson();

    res.send(patronesJSON);
});

//get para un tipo de patron
router.get('/:tipoPatron', (req, res) => {
    //obtenemos el nombre y el tipo de patron
    const tipoPatron = req.params.tipoPatron;

    //validacion del tipo de patron
    if(!existeTipoPatron(tipoPatron)) {
        //no existe el tipo de patron pasado
        res.status(404).send({message:'\'' + tipoPatron + '\' no es un tipo de patron valido'});
    } else {
        // .../nombrePatron=...
        const { nombrePatron } = req.query;

        if (!nombrePatron) {
            // .../cantidad=...&desde=...
            let { cantidad, desde } = req.query;
            //transformamos los valores a int
            cantidad = parseInt(cantidad);
            desde = parseInt(desde);

            if((!cantidad && cantidad != 0) || (!desde && desde != 0)) {
                //debemos devolver todos los patrones del tipo de patron pasado
                const resultado = obtenerTipoPatron(tipoPatron);

                res.send(resultado);
            } else if(cantidad <= 0) {
                //validamos que el parametro cantidad sea positivo
                res.status(400).send({message:'El parametro \'cantidad\' debe ser un número positivo'});
            } else if(desde < 0) {
                //validamos que el parametro desde sea positivo o 0
                res.status(400).send({message:'El parametro \'desde\' debe ser 0 o un número positivo'});
            } else {
                //debemos devolver una lista de patrones dentro del tipo de patron pasado
                const resultado = obtenerPatrones(tipoPatron, cantidad, desde);

                res.send(resultado);
            }
        } else if(typeof nombrePatron !== 'string') {
            //validamos que el parametro nombre de patron sea un string
            res.status(400).send({message:'El parametro \'nombrePatron\' debe ser un string'});
        } else {
            //debemos devolver el patron dentro de este tipo de patron
            if(!existePatronEnTipo(nombrePatron, tipoPatron)) {
                //no existe un patron con el mismo nombre dentro de este tipo de patron
                res.status(404).send({message:'No existe el patron \'' + nombrePatron 
                    + '\' en el tipo de patron \'' + tipoPatron + '\''});
            } else {
                //encontramos el patron buscado, lo obtenemos
                const patronExistente = obtenerPatronDeTipo(nombrePatron, tipoPatron);

                //enviamos a cliente el patron solicitado
                res.send(patronExistente);
            }
        }
    }
});

router.post('/:tipoPatron', (req, res) => {
    //leemos el objeto json que nos envían con el post
    const nuevoPatron = req.body;
    //guardamos el valor del parametro de la url
    const tipoPatron = req.params.tipoPatron;

    if(!nuevoPatron.imagen) {
        //validamos que el objeto pasado tenga una imagen
        res.status(400).send({message:'Es requerido un atributo \'imagen\''});
    } else if(typeof nuevoPatron.imagen !== 'string') {
        //validamos que el objeto pasado tenga una imagen de tipo string
        res.status(400).send({message:'El atributo \'imagen\' debe ser de tipo string'});
    } else if(!nuevoPatron.nombrePatron) {
        //validamos que el objeto pasado tenga un nombre de patron
        res.status(400).send({message:'Es requerido un atributo \'nombrePatron\''});
    } else if(typeof nuevoPatron.nombrePatron !== 'string') {
        //validamos que el objeto pasado tenga un nombre de patron de tipo string
        res.status(400).send({message:'El atributo \'tipoPatron\' debe ser de tipo string'});
    } else {
        //tenemos los datos de entrada correctos

        if(!existeTipoPatron(tipoPatron)) {
            //no existe el tipo de patron pasado
            res.status(400).send({message:'\'' + tipoPatron + '\' no es un tipo de patron valido'});
        } else {
            //el tipo de patron pasado es valido

            if(existePatronEnTipo(nuevoPatron.nombrePatron, tipoPatron)) {
                //ya existe un patron con el mismo nombre dentro de este tipo de patron, esto no esta permitido
                res.status(400).send({message:'El patron \'' + (nuevoPatron.nombrePatron) 
                                    + '\' ya existe dentro del tipo de patron \'' + tipoPatron +'\''});
            } else {
                //no tenemos un patron con este nombre en el tipo pasado, lo agregamos a nuestr lista
                agregarPatronEnTipo(nuevoPatron, tipoPatron);

                //enviamos a cliente que todo funcionó correctamente
                res.send({message:'Operacion realizada con exito'});
            }
        }
    }
});

module.exports = router;