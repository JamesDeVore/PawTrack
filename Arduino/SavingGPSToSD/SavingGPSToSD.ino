#include <TinyGPS++.h>
//This is the SD card read/write library

#include <SPI.h>
#include <SD.h>

//RTC
#include <Wire.h>
#include "RTClib.h"

RTC_PCF8523 rtc;

/*
   This sample sketch demonstrates the normal use of a TinyGPS++ (TinyGPSPlus) object.
   It requires the use of SoftwareSerial, and assumes that you have a
   4800-baud serial GPS device hooked up on pins 4(rx) and 3(tx).
*/
//NOTE PIN LOCATION
static const int RXPin = 5, TXPin = 3;
static const uint32_t GPSBaud = 9600;

// The TinyGPS++ object
TinyGPSPlus gps;

// file object instantiated

File myFile;

unsigned long previousMillis = 0;

const long interval = 1000;

void setup()
{
  Serial.begin(9600);
  Serial1.begin(GPSBaud);

  while (!Serial)
  {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  Serial.print("Initializing SD card...");

  if (!SD.begin(10))
  {
    Serial.println("initialization failed!");
    while (1)
      ;
  }
  Serial.println("initialization done.");

  rtc.begin();

  //the delay vars to set data delay
}

void loop()
{
  //this wraps the whole funciton
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval)
  {
    previousMillis = currentMillis;
    //RTC date object

    DateTime now = rtc.now();

    // This sketch displays information every time a new sentence is correctly encoded.
    while (Serial1.available() > 0)
      if (gps.encode(Serial1.read()))
      {

        if (gps.location.isValid())
        {
          String dataString;
          String latitude = String(gps.location.lat(), 6);
          String longitude = String(gps.location.lng(), 6);
          String today = String(gps.date.value());
          String currentHour = String(now.hour());
          String currentMinute = String(now.minute());
          String currentSec = String(now.second());
          String currentAltitude = String(gps.altitude.meters());
          String currentSpeed = String(gps.speed.mps());
          dataString.concat(latitude);
          dataString.concat(',');
          dataString.concat('N');
          dataString.concat(',');
          dataString.concat(longitude);
          dataString.concat(',');
          dataString.concat('W');
          dataString.concat(',');
          dataString.concat(currentAltitude);
          dataString.concat(',');
          dataString.concat(currentSpeed);
          dataString.concat(',');
          dataString.concat(today);
          dataString.concat(',');
          dataString.concat(currentHour);
          dataString.concat(currentMinute);
          dataString.concat(currentSec);
          dataString.concat('$');
          myFile = SD.open("testGPS1.txt", FILE_WRITE);
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
          break;
        }
      }
    //displayInfo();

    if (millis() > 5000 && gps.charsProcessed() < 10)
    {
      Serial.println(F("No GPS detected: check wiring."));
      while (true)
        ;
    }
  }
}

void displayInfo()
{
  Serial.print(F("Location: "));
  if (gps.location.isValid())
  {
    Serial.print(gps.location.lat(), 6);
    Serial.print(F(","));
    Serial.print(gps.location.lng(), 6);
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.print(F("  Date/Time: "));
  if (gps.date.isValid())
  {
    Serial.print(gps.date.month());
    Serial.print(F("/"));
    Serial.print(gps.date.day());
    Serial.print(F("/"));
    Serial.print(gps.date.year());
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.print(F(" "));
  if (gps.time.isValid())
  {
    if (gps.time.hour() < 10)
      Serial.print(F("0"));
    Serial.print(gps.time.hour());
    Serial.print(F(":"));
    if (gps.time.minute() < 10)
      Serial.print(F("0"));
    Serial.print(gps.time.minute());
    Serial.print(F(":"));
    if (gps.time.second() < 10)
      Serial.print(F("0"));
    Serial.print(gps.time.second());
    Serial.print(F("."));
    if (gps.time.centisecond() < 10)
      Serial.print(F("0"));
    Serial.print(gps.time.centisecond());
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.println();
}
