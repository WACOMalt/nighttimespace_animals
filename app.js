var fs = require("fs");
var https = require("https").createServer({
    key: fs.readFileSync("../certs/privkey.pem"),
    cert: fs.readFileSync("../certs/cert.pem")
}).listen(25546);
var io = require("socket.io").listen(https);
var patrol = require('patroljs');//navigation library
var THREE = require("three");
var TWEEN = require('tween.js');//Library for creating the linear motion from point to point from the calculated path
var slerp = require('quat-slerp');//Library for smoothing the final position coming from the tween.

//random integer functon, used for picking a random vertex on the model to set as the goal position
function RandInt(min, max) 
	{
		return Math.floor(Math.random() * (max - min)) + min;
	}

var navMesh; //my actual terrain model, as a json export (patrol.js only supports that)
var playerNavMeshGroup;  //something patrol.js put the processed mesh into
var vertCount;  //amount of vertices in the navMesh model
var randomVertNum;  //where we'll store our random target vertex's number
var randomPos;  //where we'll store the location of that random vertex

var foxRaw = new THREE.Object3D;  //create a blank fox object that can have positions animated by TWEEN.
var foxSmoothedHolder = new Three.Object3D; //This one will instead use the position after being smoothed by the slerp.

var startPos;  //The fox's start position for calculating the next path tot he next point.
var calculatedPath;  //patrol.js's output array of positions to move to to follow the path it calculated

var tweenSpeed = 1;  //how fast the linear motion between each point will move
var slerpSpeed = 0.5;  //how much motion the final smoothing pass will allow each tick
var foxTweenPos = [];   //the raw output position of the fox in it's current position along the path 
						//(this may be the same as currentPos... gotta see how tween library works.
var smoothedFoxPos = [];  //the output of the slerp stuff. This should be a nice smoothly moving position that roughly follows the path.



jsonLoader.load( 'assets/navmesh.json', function( geometry, materials ) {
	var zoneNodes = patrol.buildNodes(geometry);
	navMesh = geometry;
	vertCount = navMesh.geometry.vertices.length;

	patrol.setZoneData('level', zoneNodes);

	// Set the player's navigation mesh group
	playerNavMeshGroup = patrol.getGroup('level', player.position);
}, null);

randomVertNum = RandInt(0, vertCount)
randomPos = navMesh.geometry.vertices[randomVertNum].clone();
randomPos.applyMatrix4( navMesh.matrixWorld );
console.log("random position is /n " + randomPos);

calculatedPath = patrol.findPath(startPos, randomPos, 'level', playerNavMeshGroup); 
//no idea if I'm running this right so here's the reference line from the documentation:
//calculatedPath = patrol.findPath(player.position, target.position, 'level', playerNavMeshGroup);
//may need to instead supply the vertex as the destination, and the FoxRaw object as the start. 
//Looks like it needs something with a .position data.

console.log("The Points to get to that destination are /n " + calculatedPath);


for (i in calculatedPath)
{
//TWEEN stuff to make the Fox object linearly move to each point in order, then generate a new point and do it again. Output position will be in 
foxTweenPos //= TWEENOUTPUT
}
slerp(smoothedFoxPos, smoothedFoxPos, foxTweenPos, 0.5);


io.on("connection", function(socket) {  

	socket.on("shots", function(){
        if(playing == false){
            io.emit("shots");
            playing = true;
            setTimeout(function(){playing = false}, 7500)
        };
	});
});