const express = require('express');
const router = express.Router();

const {obtenerJson} = require('./../models/model-tipospatrones.js');

//le decimos a express que vamos a usar json
router.use(express.json());

//get de todo el arreglo de los tipos de patrones
router.get('/', (req, res) => {
    //obtenemos el json con todos los datos y lo devolvemos
    const tipospatronesJSON = obtenerJson();

    res.send(tipospatronesJSON);
});

module.exports = router;