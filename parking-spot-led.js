var five = require("johnny-five");
var Firebase = require("firebase");

var board = new five.Board();
var parkingSpotRef = new Firebase("https://incandescent-fire-3535.firebaseio.com/garage1/spot34/");

board.on("ready", function () {

  //new LED at pin 13 (change pin # if needed)
  var led = five.Led(13);
  
  led.off();
  myFirebaseRef.child("status").on("value", function(snap) {
    if(snap.val() == "vacant") {
      led.on();
    } else {
      led.off();
    }
  });//end listener
});//end board.on