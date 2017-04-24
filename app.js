var fs = require("fs");
var https = require("https").createServer({
    key: fs.readFileSync("../certs/privkey.pem"),
    cert: fs.readFileSync("../certs/cert.pem")
}).listen(25545);
var io = require("socket.io").listen(https);
var playing = false;

console.log("Running...");

io.on("connection", function(socket) {  

	socket.on("shots", function(){
        if(playing == false){
            io.emit("shots");
            playing = true;
            setTimeout(function(){playing = false}, 7500)
        };
	});
});