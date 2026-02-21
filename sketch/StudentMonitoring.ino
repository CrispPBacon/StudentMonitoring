#include "internet.h"
#include "http-requests.h"
#include "nfc_reader.h"
#include "fingerprint.h"

/* <--- MAIN ---> */ 

void setup() {
  pinMode(2, OUTPUT);
  Serial.begin(115200);
  internetBegin();
  nfcReaderSetup();
  nfcReaderReset();
  fingerprintSetup();
}

void loop() {
  connectToInternet();

  char cardUID[24];
  
  if (nfcReadCard(cardUID, sizeof(cardUID))) {
    Serial.print("Card UID: ");
    Serial.println(cardUID);

    // Example: Read block 4 (Sector 1, first data block)
    uint8_t blockData[16];
    if (nfcReadBlock(4, blockData)) {
      Serial.println("Block Data (HEX):");

      for (int i = 0; i < 16; i++) {
          if (blockData[i] < 0x10) Serial.print("0");
          Serial.print(blockData[i], HEX);
          Serial.print(" ");
      }

      Serial.println();
    }

    // INFO: Fingerprint Reading.
    // int fingerID = readFingerprint();
    // if (fingerID != -1) {
    //   Serial.print("Fingerprint matched with ID: ");
    //   Serial.println(fingerID);
    // }
    int fingerID = -1;
    // INFO: Sends HTTP Post request to the server.
    if (sendAttendance(cardUID, fingerID)) { 
      blinkLed();
    }
  }
  nfcReaderReset();
  delay(800);
}
