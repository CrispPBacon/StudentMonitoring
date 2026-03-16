#include <Adafruit_Fingerprint.h>

#define FP_RX 13
#define FP_TX 14

HardwareSerial mySerial(2);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

uint8_t id;

void setup() {
  Serial.begin(115200);
  delay(1000);

  mySerial.begin(57600, SERIAL_8N1, FP_RX, FP_TX);

  finger.begin(57600);

  if (finger.verifyPassword()) {
    Serial.println("AS608 Fingerprint sensor found!");
  } else {
    Serial.println("Sensor not found :(");
    while (1);
  }
}

void loop() {
  Serial.println("\nEnter ID (1-127) to enroll:");
  while (!Serial.available());
  id = Serial.parseInt();

  if (id == 0) {
    Serial.println("Invalid ID");
    return;
  }

  Serial.print("Enrolling ID #");
  Serial.println(id);

  while (! enrollFingerprint(id) );

  Serial.println("Enrollment complete!");
  delay(2000);
}

uint8_t enrollFingerprint(uint8_t id) {
  int p = -1;

  Serial.println("Place finger...");
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
  }

  p = finger.image2Tz(1);
  if (p != FINGERPRINT_OK) return false;

  Serial.println("Remove finger...");
  delay(2000);
  while (finger.getImage() != FINGERPRINT_NOFINGER);

  Serial.println("Place same finger again...");
  while (finger.getImage() != FINGERPRINT_OK);

  p = finger.image2Tz(2);
  if (p != FINGERPRINT_OK) return false;

  p = finger.createModel();
  if (p != FINGERPRINT_OK) return false;

  p = finger.storeModel(id);
  if (p != FINGERPRINT_OK) return false;

  return true;
}