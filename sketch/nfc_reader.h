#pragma once
#include <SPI.h>
#include <Adafruit_PN532.h>

#define PN532_SCK   33
#define PN532_MISO  25
#define PN532_MOSI  26
#define PN532_SS    27
#define PN532_RST   32

void nfcReaderSetup();
bool nfcReadCard(char* UIDBuffer, size_t bufferSize);
bool nfcReadBlock(uint8_t blockNumber, uint8_t* dataBuffer);
void nfcReaderReset();