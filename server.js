var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app); // Création du serveur http à partir de l'application Express
var io = require('socket.io')(server); // Initialisation de socket.io avec le serveur

app.get("/", function(req, res){ // Envoie du fichier index.html au client
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){ // A chaque connexion d'un client
    console.log('a user connected');
    socket.on('disconnect', function(){ // A chaque déconnexion d'un client
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){ // A chaque message reçu
        console.log('message reçu: ' + msg);
        io.emit('chat message', msg); // On renvoie le message à tous les clients
    });
});

server.listen(3000, function(){// Démarrage du serveur sur le port 3000
    console.log('listening on *:3000');
});
