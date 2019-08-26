var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/app/index.html');
});

app.use(express.static('app'));
let timerMax = 30;
let timer = timerMax;
const MAX_PLAYERS = 2;
let playerCount = 0;
let players = [];
let playersReady = false;
let interval = null;
let gameState = -1;


io.on('connection', function(socket){
	if(playerCount < MAX_PLAYERS){
		socket.emit("connected", socket.id);
		socket.on("addplayer", player=>{
			players.push(player);
			io.emit("players", players);
			if(players.length === 2){
				interval = setInterval(()=>{
					timer-=1;
					if(timer <= 0){
						console.log("nextphase")
						io.emit("phasenext", players);	
						timer = timerMax;
					}
				}, 1000);
			}
		});
		socket.on("updatePlayers", player =>{
			for (let i = 0; i < players.length; i++) {
				const element = players[i];
				if(element.id == player.id){
					players[i] = player;
					socket.broadcast.emit("updateOpponent", player);
				}
			}
		});
		socket.on("gameover", () =>{
			if(interval !== null){
				clearInterval(interval);
			}
		});
		socket.on("disconnect",()=>{
			for (let i = 0; i < players.length; i++) {
				const element = players[i];
				if(element.id == socket.id){
					players.splice(i, 1);
				}
			}
			if(interval !== null){
				clearInterval(interval);
			}
			io.emit("playerDisconnected");
		})
	} else {
		socket.emit("serverFull")
	}
})

http.listen(PORT || 3000, function() {
	console.log('listening on localhost:3000');
});