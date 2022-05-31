// server.js
 
const WebSocket = require('ws')
//array 

const usuarios = new Array();
const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
  //agregar
  
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
    usuarios.push({sck:ws,msg:message});
    for(i=0; i<usuarios.length; i++)
    {
      //console.log(usuarios[i]);
      usuarios[i].sck.send('Se conecto'+message);
    }
  
  })
  let i;
  //ws.send('Hello! Message From Server!!')
})