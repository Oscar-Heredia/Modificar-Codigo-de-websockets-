
let parrafo = document.getElementById("parrafoderespuesta");
let usuarios = new Array();
let socket;

//Se declara la estructura del JSON
var list = {
    'datos' :[]
 };

const btnConectaralservidor = document.getElementById("btnConectaralservidor"); //Se crea la union  
const btnMandarmensaje = document.getElementById("btnmandarmensaje");
const listUsuarios = document.getElementById("listusuarios");

btnConectaralservidor.addEventListener("click", ()=>{

    let nombre = document.getElementById("inpnombre").value;
    usuarios.push(nombre);
    console.log(nombre);

    list.datos.push({
        "nombre": nombre,
        "tipodedatos": "1"
      });

      console.log(list);

    json = JSON.stringify(list); //  la lista de objetos en Json
    var obj = JSON.parse(json); //Parsea el Json al objeto anterior.


    socket = new WebSocket("ws://localhost:8080");

    socket.onopen = function(e)
    {
    console.log("[open] Conexión establecida");
    console.log("Enviando al servidor");
    socket.send("Mi nombres es " + nombre);
    };

    
    socket.onmessage = function(event)
    {
        parrafo.innerHTML = (`${event.data}`);
        console.log(`[message] Datatos recibidos del servidor: ${event.data}`)
    };

    socket.onclose = function(event)
    {
        if(event.wasClean)
        {
            alert(`[close] conexion cerrada limpiamnete, codigo=${event.code} motivo=${event.reason}`);
        } else {
            alert('[close] La conexion se cayo');
        }
    };

    socket.onerror = function(error){
        alert(`[error] ${error.message}`);
    };

    var option = document.createElement("option"); //Creamos la opcion

    for(i=0; i<usuarios.length; i++)
    {
       // document.getElementById("listusuarios").innerHTML += "<option value='"+usuarios[i]+"'>"+usuarios[i]+"</option>"; 
       option.innerHTML = usuarios[i]; //Metemos el texto en la opción
       listUsuarios.appendChild(option); //Metemos la opción en el select

    };
    
});

btnMandarmensaje.addEventListener("click", ()=>{
    
    var mensaje = {
        'mensajedeusuario' :[]
     };

    let nombre = document.getElementById("inpnombre").value;
    let mensajeparausuario = document.getElementById("mensajeparausuario").value;
    let usuriodestinatario = document.getElementById("usuariomandarmensaje").value;

    mensaje.mensajedeusuario.push({
        "nombre": nombre,
        "mensajeparausuario":mensajeparausuario,
        "usuriodestinatario":usuriodestinatario,
        "tipodedatos": "2"
      });

      console.log(mensaje);

    json = JSON.stringify(mensaje); //  la lista de objetos en Json
    var obj = JSON.parse(json); //Parsea el Json al objeto anterior.
})



