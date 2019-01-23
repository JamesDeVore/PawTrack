
#include <string.h>
#include <Arduino.h>
#include <SPI.h>
#include "Adafruit_BLE.h"
#include "Adafruit_BluefruitLE_SPI.h"
#include "Adafruit_BluefruitLE_UART.h"
#include <TinyGPS++.h>
#include <Wire.h>
#include "RTClib.h"
#include <SD.h>

#include "BluefruitConfig.h"



    #define FACTORYRESET_ENABLE         1
    #define MINIMUM_FIRMWARE_VERSION    "0.6.6"
    #define MODE_LED_BEHAVIOUR          "MODE"
/*=========================================================================*/

Adafruit_BluefruitLE_SPI ble(BLUEFRUIT_SPI_CS, BLUEFRUIT_SPI_IRQ, BLUEFRUIT_SPI_RST);



// A small helper
void error(const __FlashStringHelper*err) {
  Serial.println(err);
  while (1);
}

// function prototypes over in packetparser.cpp
uint8_t readPacket(Adafruit_BLE *ble, uint16_t timeout);
float parsefloat(uint8_t *buffer);
void printHex(const uint8_t * data, const uint32_t numBytes);

// the packet buffer
extern uint8_t packetbuffer[];

//stuff for the gps and SD

RTC_PCF8523 rtc;

//NOTE PIN LOCATION
static const int RXPin = 5, TXPin = 3;
static const uint32_t GPSBaud = 9600;

String fileName = "";
const String fileName1 = "GPSData1.txt";
const String fileName2 = "GPSData2.txt";
const String fileName3 = "GPSData3.txt";
const String fileName4 = "GPSData4.txt";
const String fileName5 = "GPSData5.txt";



// The TinyGPS++ object
TinyGPSPlus gps;

// file object instantiated
File myFile;

unsigned long previousMillis = 0;

const long interval = 1000;

int gpsMode = 0;

//**** to here


void setup(void)
{
  
  while (!Serial);  // required for Flora & Micro
  delay(500);
  Serial.begin(115200);
  Serial.println(F("Adafruit Bluefruit App Controller Example"));
  Serial.println(F("-----------------------------------------"));

  /* Initialise the module */
  Serial.print(F("Initialising the Bluefruit LE module: "));

  if ( !ble.begin(VERBOSE_MODE) )
  {
    error(F("Couldn't find Bluefruit, make sure it's in CoMmanD mode & check wiring?"));
  }
  Serial.println( F("OK!") );

  /* Disable command echo from Bluefruit */
  ble.echo(false);

  Serial.println("Requesting Bluefruit info:");
  /* Print Bluefruit information */
  ble.info();

  Serial.println(F("Please use Adafruit Bluefruit LE app to connect in Controller mode"));
  Serial.println(F("Then activate/use the sensors, color picker, game controller, etc!"));
  Serial.println();

  ble.verbose(false);  // debug info is a little annoying after this point!

  /* Wait for connection */
  while (! ble.isConnected()) {
      delay(500);
  }

  Serial.println(F("******************************"));

  // Set Bluefruit to DATA mode
  Serial.println( F("Switching to DATA mode!") );
  ble.setMode(BLUEFRUIT_MODE_DATA);

  Serial.println(F("******************************"));

  GPSSetup();

}

/**************************************************************************/
/*!
    @brief  Constantly poll for new command or response data
*/
/**************************************************************************/
void loop(void)
{
  /* Wait for new data to arrive */
  uint8_t len = readPacket(&ble, BLE_READPACKET_TIMEOUT);    
    Serial.println("here?");


  /* Got a packet! */
  // printHex(packetbuffer, len);


  // Buttons
  if (packetbuffer[1] == 'B') {
    uint8_t buttnum = packetbuffer[2] - '0';
    boolean pressed = packetbuffer[3] - '0';
    if(buttnum == 1){
      
      Serial.println("success");
      gpsMode = 1;
      delay(500);
      }
     if(buttnum == 2) {
      Serial.println("Stop function here");
      gpsMode = 0;
      delay(500);
      }
  }

  if(gpsMode == 1){
      
     
     GPSReadAndLog();
     ble.println(fileName);
 }
}

void GPSSetup () {

  Serial.begin(9600);
  Serial1.begin(GPSBaud);

  Serial.print("Initializing SD card...");

  if (!SD.begin(10))
  {
    Serial.println("initialization failed!");
    while (1)
      ;
  }

  if(!SD.exists(fileName1)){
    fileName = fileName1;
    } else if(!SD.exists(fileName2)){
      fileName = fileName2;
      } else if(!SD.exists(fileName3)){
        fileName = fileName3;
        } else if(!SD.exists(fileName4)){
          fileName = fileName4;
          } else if(!SD.exists(fileName5)){
            fileName = fileName5;
            } else {
              SD.remove(fileName1);
              fileName = fileName1;
              }
  Serial.println("SD initialization done." + fileName);
  rtc.begin();
}

void GPSReadAndLog () {
  
    //RTC date object
    DateTime now = rtc.now();

    while (Serial1.available() > 0)
      if (gps.encode(Serial1.read()))
      {

        if (gps.location.isValid())
        {
          String dataString;
          //String latitude = String(gps.location.lat(), 6);
          //String longitude = String(gps.location.lng(), 6);
          String today = String(now.day());
          String current_month = String(now.month());
          String current_year = String(now.year());
          String currentHour = String(now.hour());
          String current_date = (today + "/" + current_month + "/" + current_year);
          String currentMinute = String(now.minute());
          String currentSec = String(now.second());
          String currentAltitude = String(gps.altitude.meters());
          String currentSpeed = String(gps.speed.mps());
          dataString.concat(String(gps.location.lat(), 6));
          dataString.concat(',');
          dataString.concat('N');
          dataString.concat(',');
          dataString.concat(String(gps.location.lng(), 6));
          dataString.concat(',');
          dataString.concat('W');
          dataString.concat(',');
          dataString.concat(currentAltitude);
          dataString.concat(',');
          dataString.concat(currentSpeed);
          dataString.concat(',');
          dataString.concat(current_date);
          dataString.concat(',');
          dataString.concat(currentHour);
          dataString.concat(currentMinute);
          dataString.concat(currentSec);
          dataString.concat('$');
          
          myFile = SD.open(fileName, FILE_WRITE);
          if (myFile)
          {
            //save the textstring to the SD card
            Serial.println(dataString);
            myFile.println(dataString);
            // close the file:
            myFile.close();
          }
          else
          {
            // if the file didn't open, print an error:
            Serial.println("error opening test.txt");
          }
        }
        break;
      }
    //error handling
    if (millis() > 5000 && gps.charsProcessed() < 10)
    {
      Serial.println(F("No GPS detected: check wiring."));
      while (true);
    }
  }
