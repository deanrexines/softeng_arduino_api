#include <Servo.h>

Servo servo1;
Servo servo2;
int pos=0;
int gateOpen = 1; //1 if gate can open, 0 if should remain closed

//Sensor variables
int pir1State = LOW;
int pir1val = 0; //this value will be the actual sensor value

//on = 1 = open spot, free to take 
//off = 0 = reserved and/or it's been taken (should be apparent to user)
int spot1 = 1;
int spot2 = 0;
int spot3 = 1;

void setup() {

  Serial.begin(9600); //Turn Serial Protocol ON
  
  pinMode(2, OUTPUT); //Parking Spot 1
  pinMode(3, OUTPUT); //Parking Spot 2
  pinMode(4, OUTPUT); //Parking Spot 3

  //Sensor(s)
  pinMode(10, OUTPUT); //sensor for parking spot 1

  //Entrance Gate 
  servo1.attach(9);
  Serial.println("SERVO STARTED");

  //Exit Gate 
  //servo2.attach(
}

void loop() {

//ONLY TEMPORARY UNTIL WE LINK TO FIREBASE. AFTER THAT, JUST CHECK FIREBASE VARIABLES
/*gateOpen = Serial.read();
spot1 = Serial.read();
spot2 = Serial.read();
spot3 = Serial.read();*/
//END OF TEMPORARY

  if(gateOpen == 1){ 
    for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
      servo1.write(pos);              // tell servo to go to position in variable 'pos'
      delay(15);                       // waits 15ms for the servo to reach the position
      //pos = 180; //close after 15ms
    }
  }
   
//spot 1 

  //First read the PIR sensor data 
  pir1val = digitalRead(10);
  if(pir1val == HIGH){
    Serial.println("Motion detected!");
      if(pir1State == LOW){ //alert that it is now on
        spot1 = 0; // "car has parked"
        pir1State = HIGH;
      }
  } //else do nothing
 //Then check the value   
    if(!spot1){
      digitalWrite(2, LOW);
      delay(1000);
    } 
    else{
      digitalWrite(2, HIGH);
      delay(1000);
    }

//spot 2  
  if(!spot2){
    digitalWrite(3, LOW);
    delay(1000);
  } 
  else{
    digitalWrite(3, HIGH);
    delay(1000);
  }

//spot 3 
  if(!spot3){
    digitalWrite(4, LOW);
    delay(1000);
  } 
  else{
    digitalWrite(4, HIGH);
    delay(1000);
  }
}

