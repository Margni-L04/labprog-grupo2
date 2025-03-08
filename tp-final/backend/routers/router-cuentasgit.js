const express = require('express');
const router = express.Router();

const {obtenerJson} = require('./../models/model-cuentasgit.js');

//le decimos a express que vamos a usar json
router.use(express.json());

//get de todo el arreglo de las cuentas de github
router.get('/', (req, res) => {
    //obtenemos el json con todos los datos y lo devolvemos
    const cuentasgitJSON = obtenerJson();

    res.send(cuentasgitJSON);
});

module.exports = router;