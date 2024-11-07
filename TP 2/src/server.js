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

app.post('/api/agregarPatrones/:tipoPatron', (req, res) => {
    //leemos el objeto json que nos envían con el post
    const nuevoPatron = req.body;
    //guardamos el valor del parametro de la url
    const tipoPatron = req.params.tipoPatron;

    if(!nuevoPatron.imagen || typeof nuevoPatron.imagen !== 'string') {
        //validamos que el objeto pasado tenga una imagen y que sea de tipo string
        res.status(400).send('Es requerido un atributo "imagen" y debe ser de tipo string');
    } else if(!nuevoPatron.nombrePatron || typeof nuevoPatron.nombrePatron !== 'string') {
        //validamos que el objeto pasado tenga un nombre del patron y que sea de tipo string
        res.status(400).send('Es requerido un atributo "nombrePatron" y debe ser de tipo string');
    } else {
        //leemos el contenido del archivo json ejemplos-patrones (se lee como un string)
        const dataPatrones = fs.readFileSync('public/json/ejemplos-patrones.json', 'utf-8');
        //transformamos el contenido a formato json
        const patronesJSON = JSON.parse(dataPatrones);

        //buscamos el patron que tenga el mismo nombre que el pasado por parámetro
        const patronJSON = patronesJSON.find(pat => pat.nombre == tipoPatron);

        if(!patronJSON) {
            //no existe el tipo de patron pasado
            res.status(400).send('"' + tipoPatron + '" no es un tipo de patron valido');
        } else {
            //buscamos dentro de la lista de patrones del tipo indicado si existe uno con el mismo nombre de patron
            const patronExistente = (patronJSON.patrones).find(pat => pat.nombrePatron == nuevoPatron.nombrePatron);

            if(patronExistente) {
                //ya existe un patron con el mismo nombre dentro de este tipo de patron, esto no esta permitido
                res.status(400).send('El patron "' + (nuevoPatron.nombrePatron) 
                                    + '" ya existe dentro del tipo de patron "' + tipoPatron +'"');
            } else {
                //agregamos a la lista de patrones existentes el enviado en el post
                patronJSON.patrones.push(nuevoPatron);

                //transformamos la nueva lista de patrones a formato string
                const jsonData = JSON.stringify(patronesJSON);
                //reescribimos la nueva lista de nuevo en el archivo json ejemplos-patrones (la ruta es relativa al archivo "package.json")
                fs.writeFileSync('public/json/ejemplos-patrones.json', jsonData, 'utf-8');

                //enviamos a cliente que todo funcionó correctamente
                res.send('Operacion realizada con exito');
            }
        }
    }
});

//abrimos el server en el puerto que especificamos
app.listen(puerto, () => {
    console.log('Entremos! http://' + ip + ':' + puerto);
});

app.get('/api/patrones', (req, res) => { //Mostrar
    // Obtenemos la cantidad y el inicio
    const cantidad = parseInt(req.query.cantidad);
    const from = parseInt(req.query.from);
    const tipoPatron = req.query.tipoPatron;
    
    //leemos el contenido del archivo json ejemplos-patrones (se lee como un string)
    const dataPatrones = fs.readFileSync('public/json/ejemplos-patrones.json', 'utf-8');
    //transformamos el contenido a formato json
    const patronesJSON = JSON.parse(dataPatrones);

    if(!cantidad || cantidad <= 0){
        //cantidad invalida
        res.status(400).send('cantidad  = ' + cantidad + ' no es valida');
    } else if(!from || from < 0){
        //from invalido
        res.status(400).send('inicio = ' + from + ' no es valido');
    } else if (!tipoPatron || typeof tipoPatron !== 'string') {
        //tipoPatron invalido
        res.status(400).send('tipoPatron = ' + tipoPatron + ' no es valido');
    } else {
        //filtramos por tipo de patrón
        const tipoEncontrado = patronesJSON.find(pat => pat.nombre == tipoPatron);
        if (tipoEncontrado) {
            //si encontramos el tipo, usamos sus patrones
            patronesFiltrados = tipoEncontrado.patrones;
            const resultado = patronesFiltrados.slice(from, from + cantidad);
            res.send(resultado);
        } else {
            //si no encontramos el tipo, enviamos un error
            res.status(404).json('Tipo de patrón no encontrado');
        }
    }
});

app.get('/api/nombrepatron', (req, res) => { //Mostrar
    // Obtenemos el nombre y el tipo de patron
    const nombrePatron = req.query.nombrePatron;
    const tipoPatron = req.query.tipoPatron;
    
    //leemos el contenido del archivo json ejemplos-patrones (se lee como un string)
    const dataPatrones = fs.readFileSync('public/json/ejemplos-patrones.json', 'utf-8');
    //transformamos el contenido a formato json
    const patronesJSON = JSON.parse(dataPatrones);

    if(!nombrePatron || typeof nombrePatron !== 'string'){
        //nombrePatron invalido
        res.status(400).send('nombrePatron = ' + nombrePatron + ' no es valido');
    } else if (!tipoPatron || typeof tipoPatron !== 'string') {
        //tipoPatron invalido
        res.status(400).send('tipoPatron = ' + tipoPatron + ' no es valido');
    } else {
        //filtramos por tipo de patrón
        const tipoEncontrado = patronesJSON.find(pat => pat.nombre == tipoPatron);
        if (tipoEncontrado) {
           //buscamos dentro de la lista de patrones del tipo indicado si existe uno con el mismo nombre de patron
            const patronExistente = (tipoEncontrado.patrones).find(pat => pat.nombrePatron == nombrePatron);
            if(patronExistente) {
                //Enviamos el patron encontrado
                res.send(patronExistente);
            }else{
                //si no encontramos el patron, enviamos un error
                res.status(404).json('Nombre de patrón no encontrado');
            }
        } else {
            //si no encontramos el tipo, enviamos un error
            res.status(404).json('Tipo de patrón no encontrado');
        }
    }
});