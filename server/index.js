import Express from "express";
import config from "@config";
import http from "http";
import * as WebSocket from "ws";
import cors from "cors";

const app = Express();

app.use(cors({
   origin: '*'
 }));

app.get("/", (req, res) => {
   res.status(200).send("Hello, world!").end();
});

//
// Start the server.
//
const server = app.listen(config.port, () => {
   console.log(`Server run at http://localhost:${config.port}`);
   console.log("Press Ctrl+C to quit");
});

//
// Create a WebSocket server completely detached from the HTTP server.
//
const wss = new WebSocket.Server({server});
/*
const wss = new WebSocket.Server({
   noServer: true,
   path: "/websockets",
});

server.on("upgrade", (request, socket, head) => {
   console.log( 'upgrade' );
   //console.log( request, socket, head );
   //console.log( request );
   wss.handleUpgrade(request, socket, head, (websocket) => {
      wss.emit("connection", websocket, request);
   });
});
*/

wss.on('connection', function (ws, request) {
   console.log( 'connection' );
   ws.on('message', function (message) {
      console.log( 'got message', message );
      //
      // Here we can now use session parameters.
      //
      //console.log(`Received message ${message} from user ${userId}`);
      ws.send(message);
      
      // broadcast
      /*
      wss.clients.forEach( function each(client) {
         if( client !== ws && client.readyState === WebSocket.OPEN ) {
            client.send(message);
         }
      })
      */
   });

   ws.on('close', function () {
      console.log( 'close' );
   });
});




