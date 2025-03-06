//Para prender el servidor: server.js (posicionados en carpeta backend)
//O con nodemon instalado: npx nodemon server.js

//importa el express (módulo que te permite ahorrar código de ejecución del código)
const express = require('express');
const routerPatrones = require('./routers/router-patrones.js');
const routerTiposPatrones = require('./routers/router-tipospatrones.js');
const routerCuentasGit = require('./routers/router-cuentasgit.js');

//instancia express
const app = express();

//const ip = '172.16.100.208';
const ip = 'localhost'; //para evitar usar el comando anterior

//elegimos un puerto, superior a 1024, pues estos son puertos reservados
const puerto = '3017';

//cuando el usuario entre al server, se lo llevara al index
app.get('/', (req, res) => { // '/' indica la raiz
    res.send('Hallo');
});

//router de patrones
app.use('/api/patrones', routerPatrones);
app.use('/api/tipospatrones', routerTiposPatrones);
app.use('/api/cuentasgit', routerCuentasGit);

//abrimos el server en el puerto que especificamos
app.listen(puerto, () => {
    console.log('Entremos! http://' + ip + ':' + puerto);
});