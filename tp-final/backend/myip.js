/*
Ver ip local en Linux
En terminal: ip addr show

Buscamos el relacionado con la ip local, en mi caso es wlp3s0
En la línea que contiene inet, buscamos la ip y la copiamos sin la máscara (172.16.100.208/16 por ej)
*/

//Val
const API_URL = "http://192.168.1.88:3017";

//Lucasss
//const API_URL = "http://192.168.0.108:3017";

export default API_URL;