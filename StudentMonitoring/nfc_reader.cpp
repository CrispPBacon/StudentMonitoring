#include "nfc_reader.h"

Adafruit_PN532 nfc(PN532_SS);

void nfcReaderSetup() {
  SPI.begin(PN532_SCK, PN532_MISO, PN532_MOSI, PN532_SS);
  nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata) {
      Serial.println("Didn't find PN532. Check your connections.");
      while (1);
  }

  // Display firmware version
  Serial.print("Found PN532 with firmware version: ");
  Serial.print((versiondata >> 16) & 0xFF, DEC);
  Serial.print('.');
  Serial.println((versiondata >> 8) & 0xFF, DEC);

  // Configure board to read RFID tags
  nfc.SAMConfig();
}

bool nfcReadCard(char* UIDBuffer, size_t bufferSize) {
    uint8_t uid[7]; 
    uint8_t uidLength;

    // Try to read the NFC card
    bool success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);
    if (!success) {
        Serial.println("Authentication failed");
        if (bufferSize > 0) UIDBuffer[0] = '\0'; // clear buffer
        return false;
    }

    // Fill the buffer with HEX representation of UID
    char* ptr = UIDBuffer;
    size_t remaining = bufferSize;

    for (uint8_t i = 0; i < uidLength; i++) {
        // Write two-digit HEX for each byte
        int written = snprintf(ptr, remaining, "%02X%s", uid[i], (i < uidLength - 1) ? " " : "");
        if (written >= remaining) {
            // Buffer too small
            Serial.println("UID buffer too small!");
            UIDBuffer[0] = '\0';
            return false;
        }
        ptr += written;
        remaining -= written;
    }
    
    return true;
}

void nfcReaderReset() {
    digitalWrite(PN532_RST, LOW);   // Pull RST low
    delay(10);                           // Wait 50ms (typical reset pulse)
    digitalWrite(PN532_RST, HIGH);  // Release RST
    delay(100);                           // Give PN532 time to initialize
}

bool nfcReadBlock(uint8_t blockNumber, uint8_t* dataBuffer) {
    uint8_t uid[7];
    uint8_t uidLength;

        // Step 1: Detect card
    if (!nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength)) {
        Serial.println("No card detected");
        return false;
    }

    // Step 2: Default key (factory key)
    uint8_t keyA[6] = { 
        0xFF, 0xFF, 0xFF, 
        0xFF, 0xFF, 0xFF 
    };

    // Step 3: Authenticate block
    if (!nfc.mifareclassic_AuthenticateBlock(uid, uidLength, blockNumber, 0, keyA)) {
        Serial.println("Authentication failed!");
        return false;
    }

        // Step 4: Read block (16 bytes)
    if (!nfc.mifareclassic_ReadDataBlock(blockNumber, dataBuffer)) {
        Serial.println("Read failed!");
        return false;
    }

    return true;
}