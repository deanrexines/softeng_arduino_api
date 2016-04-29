var five = require("../lib/johnny-five.js");
var Firebase = require("firebase");

var board = new five.Board();
var parkingSpot1Ref = new Firebase("https://incandescent-fire-3535.firebaseio.com/garage1/spot1");
var parkingSpot2Ref = new Firebase("https://incandescent-fire-3535.firebaseio.com/garage1/spot2");
var parkingSpot3Ref = new Firebase("https://incandescent-fire-3535.firebaseio.com/garage1/spot3");
var gateRef = new Firebase("https://incandescent-fire-3535.firebaseio.com/gates/entrance");

//Spot1 Sensor 


board.on("ready", function () {

	//Entrance gate 
	//var gate = new five.Servo(9);
	var gate = new five.Servo({
    pin: 9,           // Which pin is it attached to?
    type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
    range: [0,180],    // Default: 0-180
    fps: 40,          // Used to calculate rate of movement between positions
	startAt: 90,
  });
  

  //Entrance gate 
  gateRef.on("value", function(snap) {  
	if(snap.val() == "true"){
		gate.to(-180);
	}
	else{
		gate.to(180);
	}
  });
  
  //PIR sensor for spot3
  var sensor3 = new five.Motion(10);
  //Occupancy of spot variables, 
		//if 0, then spot is not occupied
		//if 1, then spot should be occupied
  var occupied3 = 1; //for spot3
  
  //calibrated once 
  sensor3.on("calibrated", function() {
    console.log("Motion sensor has been calibrated.");
  });
    
  //new LED at pins 2 - 4 (change pin # if needed)
  var led1 = five.Led(2); //spot1 
  var led2 = five.Led(3); //spot2 
  var led3 = five.Led(4); //spot3
  
  led1.off();
  parkingSpot1Ref.child("status").on("value", function(snap) {
    if(snap.val() == "vacant") {
	 parkingSpot1Ref.child("reserved").on("value", function(snap2) {
		if(snap2.val() == "no"){
			led1.on();
		}
		else{
			led1.off();
		}
	 }); //end of reservation check 
    } else if (snap.val() == "taken") {
      led1.off();
    }
  });//end spot1 listener
  
  //other spots, just reading reservations to showcase functionality
  led2.off();
  parkingSpot2Ref.child("reserved").on("value", function(snap) {
    if(snap.val() == "no") {
      led2.on();
    } else {
      led2.off();
    }
  });//end spot2 listener
  
  //SPOT3 WILL SHOWCASE THE PIR SENSOR WRITING TO THE DATABASE
  led3.off();
  sensor3.on("motionstart", function(){ //if motion detected 
	console.log("CAR HAS MOVED: ", Date.now());
	
		parkingSpot3Ref.child("status").on("value", function(snap) {
			if(snap.val() == "vacant") { //they are parking into the spot
			 parkingSpot1Ref.child("reserved").on("value", function(snap2) {
				if(snap2.val() == "no"){ //spot not reserved, car can park in it 
					led3.off(); 
					parkingSpot3Ref.child('status').set("taken");
					console.log("Spot has now been taken.");
				//NOTE: for this demo, we are not showing a check to see if car is attempting to park in a reserved spot
				}
			 }); //end of reservation check 
			} else if (snap.val() == "taken") { //they are moving out of the spot 
			  led3.on();
			  parkingSpot3Ref.child('status').set("vacant");
			  console.log("Spot is now vacant.");
			}
	  });//end spot1 listener
  
	});
   sensor3.on("motionend", function(){ //if motion no longer detected 
	console.log("CAR HAS STOPPED MOVING: ", Date.now());
		parkingSpot3Ref.child("status").on("value", function(snap) {
		if(snap.val() == "vacant") { //they are parking into the spot
		 parkingSpot1Ref.child("reserved").on("value", function(snap2) {
			if(snap2.val() == "no"){
				led1.on();
			}
			else{
				led1.off();
			}
		 }); //end of reservation check 
		} else if (snap.val() == "taken") {
		  led1.off();
		}
	  });//end spot1 listener
   }); 
  
  
});//end board.on