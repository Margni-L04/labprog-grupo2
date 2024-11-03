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

module.exports = app;

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
    const tipoPatron = req.params.tipoPatron;

    //leemos el contenido del archivo json ejemplos-patrones (se lee como un string)
    const dataPatrones = fs.readFileSync('public/json/ejemplos-patrones.json', 'utf-8');
    //transformamos el contenido a formato json
    const patronesJSON = JSON.parse(dataPatrones);

    //buscamos el patron que tenga el mismo nombre que el pasado por parámetro
    const patronJSON = patronesJSON.find(pat => pat.nombre == tipoPatron);

    if(!patronJSON) {
        //no existe el tipo de patron pasado
        res.send('"' + tipoPatron + '" no es un tipo de patron valido');
    } else {
        //agregamos a la lista de patrones existentes el enviado en el post
        patronJSON.patrones.push(nuevoPatron);

        //transformamos la nueva lista de patrones a formato string
        const jsonData = JSON.stringify(patronesJSON);
        //reescribimos la nueva lista de nuevo en el archivo json ejemplos-patrones (la ruta es relativa al archivo "package.json")
        fs.writeFileSync('public/json/ejemplos-patrones.json', jsonData, 'utf-8');

        //enviamos a cliente que todo funcionó correctamente
        res.send('Todo OK');
    }
});

//abrimos el server en el puerto que especificamos
app.listen(puerto, () => {
    console.log('Entremos! http://' + ip + ':' + puerto);
});