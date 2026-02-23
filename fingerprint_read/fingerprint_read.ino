#include <Adafruit_Fingerprint.h>
#include <HardwareSerial.h>

#define FP_RX 13
#define FP_TX 14

HardwareSerial mySerial(2);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

void setup()
{
  Serial.begin(115200);
  delay(1000);

  Serial.println("\nAS608 Multi Enrollment (ESP32)");

  mySerial.begin(19200, SERIAL_8N1, FP_RX, FP_TX);
  finger.begin(19200);

  if (finger.verifyPassword()) {
    Serial.println("Sensor found!");
  } else {
    Serial.println("Sensor not found :(");
    while (1);
  }
}

void loop()
{
  Serial.println("\nEnter ID (1-127) to enroll:");
  
  while (!Serial.available());
  uint8_t id = Serial.parseInt();

  if (id == 0) {
    Serial.println("Invalid ID!");
    return;
  }

  Serial.print("Enrolling ID #");
  Serial.println(id);

  enrollFingerprint(id);
}

uint8_t enrollFingerprint(uint8_t id) {

  int p = -1;

  Serial.println("Place finger...");
  while ((p = finger.getImage()) != FINGERPRINT_OK) {
    delay(50);
  }

  if (finger.image2Tz(1) != FINGERPRINT_OK) {
    Serial.println("Error first image");
    return p;
  }

  Serial.println("Remove finger...");
  delay(2500);

  Serial.println("Place SAME finger again...");
  while ((p = finger.getImage()) != FINGERPRINT_OK) {
    delay(50);
  }

  if (finger.image2Tz(2) != FINGERPRINT_OK) {
    Serial.println("Error second image");
    return p;
  }

  if (finger.createModel() != FINGERPRINT_OK) {
    Serial.println("Fingerprints did not match");
    return p;
  }

  if (finger.storeModel(id) == FINGERPRINT_OK) {
    Serial.println("Stored successfully!");
  } else {
    Serial.println("Error storing fingerprint");
  }

  return p;
}