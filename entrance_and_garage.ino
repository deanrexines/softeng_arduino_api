#include <Servo.h>

Servo servo1;
Servo servo2;
int pos=0;
int gateOpen = 1; //1 if gate can open, 0 if should remain closed

int pir1State = LOW;
int pir1val = 0; //this value will be the actual sensor value

//Parking spot variables, values will be taken from status variables in Firebase
//off = 0 = reserved or taken
//on = 1 = free to take
int spot1 = 1;
int spot2 = 0;
int spot3 = 1;

//Occupancy of spot variables, 
//if 0, then spot is not occupied
//if 1, then spot should be occupied
int occupied1 = 0; 

//counter for Serial Monitor for motion detection
int i=0;


void setup() {

  Serial.begin(9600); //Turn Serial Protocol ON
  
  pinMode(2, OUTPUT); //Parking Spot 1
  pinMode(3, OUTPUT); //Parking Spot 2
  pinMode(4, OUTPUT); //Parking Spot 3

  //Sensor(s)
  pinMode(10, INPUT); //sensor for parking spot 1

  //Entrance Gate 
  servo1.attach(9);
  Serial.println("SERVO STARTED");

  //Exit Gate 
  //servo2.attach(
}

void loop() {

//Servo - Entrance Gate 
  if(gateOpen == 1){ 
    for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
      servo1.write(pos);              // tell servo to go to position in variable 'pos'
      delay(15);                       // waits 15ms for the servo to reach the position
      //pos = 180; //close after 15ms
    }
  }

//////////////////////////////////////////////////
//spot 1 

  //First read the PIR sensor data 
  pir1val = digitalRead(10);
  if(pir1val == HIGH){ //motion detected 
        i++;
        Serial.println("Motion detected!");
        Serial.println(i, DEC);
        if(!occupied1 && spot1){ //if spot1 is not occupied and the spot1 is available, that means a car is trying to enter it now
           spot1 = 0; //set spot1 to taken now, write to Firebase again
           digitalWrite(2, LOW); //turn LED off
           occupied1 = 1; //set occupied to 1 now
        }
        else if(occupied1 && !spot1){//if spot1 is occupied and the spot1 is taken, that means a car is trying to exit it now  
            spot1 = 1; //set spot1 to available again, write to Firebase again 
            digitalWrite(2, HIGH); //turn LED on
            occupied1 = 0; //set occupied to 0 now      
        }
        //   0,0
        else if (!occupied1 && !spot1){ 
          //this means the user is moving in front of a taken spot. This is only physically possible if the spot is taken because it's reserved
          //[ INSERT CHECK THAT THE PERSON WHO OWNS THIS SPOT IS THE RIGHT PERSON]
          //[ IF NOT, DO NOTHING. REPORT]          
        }
        else { 
          //this means the space is occupied and available
          //....this should not happen
        }
  }
  else { //no motion detected  
     if(spot1){
        digitalWrite(2, HIGH);
     }
     else if (!spot1){
        digitalWrite(2, LOW);
     }
  }
  


////////////////////////////////////////////////////

//spot 2  
  if(!spot2){
    digitalWrite(3, LOW);
   // delay(1000);
  } 
  else{
    digitalWrite(3, HIGH);
   // delay(1000);
  }

///////////////////////////////////////////////////
//spot 3 
  if(!spot3){
    digitalWrite(4, LOW);
  //  delay(1000);
  } 
  else{
    digitalWrite(4, HIGH);
   // delay(1000);
  }
}
