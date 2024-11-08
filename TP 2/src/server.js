//Para prender el servidor: server.js (posicionados en carpeta src)
//O con nodemon instalado: npx nodemon server.js

/*
Para crear los json y la carpeta node_modules
npm init -y
npm install express
*/

//importa el express (módulo que te permite ahorrar código de ejecución del código)
const express = require('express');

//instancia express
const app = express();

const {existeTipoPatron, existePatronEnTipo, agregarPatronEnTipo, 
    obtenerPatrones, obtenerPatronDeTipo} = require('./models/patrones.js');

/*
Ver ip local en Linux
En terminal: ip addr show

Buscamos el relacionado con la ip local, en mi caso es wlp3s0
En la línea que contiene inet, buscamos la ip y la copiamos sin la máscara (172.16.100.72/16 por ej)
*/

//const ip = '172.16.100.208';
const ip = 'localhost'; //para evitar usar el comando anterior

//elegimos un puerto, superior a 1024, pues estos son puertos reservados
const puerto = '3017';

//importamos path que otorga direcciones compaible para cualquier sistema operativo
const path = require('path');

//revisamos el file system para evitar poner la ruta correcta
const fs = require('fs');

//con el path, creamos la direccion donde se encuentra nuestro proyecto
const staticPath = path.join(__dirname, '../public');
//agregamos el path para el resto de páginas
const staticPathPages = path.join(__dirname, '../public/pages');

//imprimimos para observar si es la ruta que deseamos usar
console.log('Ruta del proyecto:', staticPath);

//con fs preguntamos si la ruta existe, de no ser asi, finalizamos el codigo
if (!fs.existsSync(staticPath)) {
    console.error('Ruta incorrecta :/ ', staticPath);
    process.exit(1);
}

//asignamos la direccion del index
const indexPath = path.join(staticPath, '/pages/index.html');

//con fs probamos si existe
if (!fs.existsSync(indexPath)) {
    console.error('Archivo incorrecto: ', indexPath);
    process.exit(1);
}

//agregamos al servidor la ruta del proyecto y de las páginas
app.use(express.static(staticPath));
app.use(express.static(staticPathPages));

//cuando el usuario entre al server, se lo llevara al index
app.get('/', (req, res) => { // '/' indica la raiz
    res.sendFile(indexPath);
});

//le decimos a express que vamos a usar json
app.use(express.json());

app.post('/api/patrones/:tipoPatron', (req, res) => {
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

//url/api/patrones?cantidad=...&desde=...&tipoPatron=...
app.get('/api/patrones', (req, res) => {
    //obtenemos la cantidad, el inicio y el tipo de patron de la url
    let { cantidad, desde, tipoPatron } = req.query;
    //transformamos los valores a int
    cantidad = parseInt(cantidad);
    desde = parseInt(desde);

    if(!cantidad && cantidad != 0){
        //validamos que nos pasen como parametro de url una cantidad
        res.status(400).send({message:'Es requerido un parametro \'cantidad\''});
    } else if(cantidad <= 0){
        //validamos que el parametro cantidad sea positivo
        res.status(400).send({message:'El parametro \'cantidad\' debe ser un número positivo'});
    } else if(!desde && desde != 0){
        //validamos que nos pasen como parametro de url un valor desde
        res.status(400).send({message:'Es requerido un parametro \'desde\''});
    } else if(desde < 0){
        //validamos que el parametro desde sea positivo o 0
        res.status(400).send({message:'El parametro \'desde\' debe ser 0 o un número positivo'});
    } else if (!tipoPatron) {
        //validamos que nos pasen como parametro de url un tipo de patron
        res.status(400).send({message:'Es requerido un parametro \'tipoPatron\''});
    } else if(typeof tipoPatron !== 'string') {
        //validamos que el parametro tipo de patron sea un string
        res.status(400).send({message:'El parametro \'tipoPatron\' debe ser un string'});
    } else {
        //datos de entrada correctos
        
        if(!existeTipoPatron(tipoPatron)) {
            //no existe el tipo de patron pasado
            res.status(400).send({message:'\'' + tipoPatron + '\' no es un tipo de patron valido'});
        } else {
            //existe el tipo de patron pasado, obtenemos los patrones con los datos de los parametros
            const resultado = obtenerPatrones(tipoPatron, cantidad, desde);

            res.send(resultado);
        }
    }
});

//url/api/nombrepatron?nombrePatron=...&tipoPatron=...
app.get('/api/nombrepatron', (req, res) => {
    // Obtenemos el nombre y el tipo de patron
    const {nombrePatron, tipoPatron} = req.query;

    if (!nombrePatron) {
        //validamos que nos pasen como parametro de url un nombre de patron
        res.status(400).send({message:'Es requerido un parametro \'nombrePatron\''});
    } else if(typeof nombrePatron !== 'string') {
        //validamos que el parametro nombre de patron sea un string
        res.status(400).send({message:'El parametro \'nombrePatron\' debe ser un string'});
    } else if (!tipoPatron) {
        //validamos que nos pasen como parametro de url un tipo de patron
        res.status(400).send({message:'Es requerido un parametro \'tipoPatron\''});
    } else if(typeof tipoPatron !== 'string') {
        //validamos que el parametro tipo de patron sea un string
        res.status(400).send({message:'El parametro \'tipoPatron\' debe ser un string'});
    } else {
        //tenemos los datos de entrada correctos

        if(!existeTipoPatron(tipoPatron)) {
            //no existe el tipo de patron pasado
            res.status(404).send({message:'\'' + tipoPatron + '\' no es un tipo de patron valido'});
        } else {
            //el tipo de patron pasado es valido

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

//abrimos el server en el puerto que especificamos
app.listen(puerto, () => {
    console.log('Entremos! http://' + ip + ':' + puerto);
});