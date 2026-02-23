#include "fingerprint.h"

HardwareSerial mySerial(2);  // UART2
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

void fingerprintSetup() {
  mySerial.begin(57600, SERIAL_8N1, FP_RX, FP_TX);
  delay(1000);
  Serial.println("Initializing fingerprint sensor...");
  finger.begin(57600);
  
  if (finger.verifyPassword()) {
    Serial.println("Fingerprint sensor detected!");
  } else {
    Serial.println("Fingerprint sensor NOT found 😢");
    while (1) { delay(1); }
  }
}

int readFingerprint() {
  // Record the current time
  unsigned long startMillis = millis();  
  // Wait for 5 seconds
  while (millis() - startMillis < 5000) {  
    int fingerID = finger.getImage(); 

    if (fingerID == FINGERPRINT_OK) {
      // Convert the captured image to a template
      fingerID = finger.image2Tz();
      if (fingerID != FINGERPRINT_OK) {
        Serial.println("Failed to convert image to template");
        // return -1;
      }

      // Search for a matching fingerprint in the sensor's database
      fingerID = finger.fingerSearch();
      if (fingerID == FINGERPRINT_OK) {
        Serial.println("Fingerprint matched successfully!");
        return finger.fingerID;
      } else if (fingerID == FINGERPRINT_NOTFOUND) {
        Serial.println("No match found");
        // return -1;
      } else {
        Serial.println("Error during matching");
        // return -1;
      }
    }

    // If no finger is detected, print a message and wait before checking again
    Serial.println("Waiting for finger...");
    delay(500);
  }

  Serial.println("Timeout: No finger detected in 5 seconds.");
  return -1;
}
