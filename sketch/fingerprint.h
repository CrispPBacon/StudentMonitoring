#pragma once
#include <Adafruit_Fingerprint.h>
#include <Arduino.h>

#define FP_RX 13
#define FP_TX 14

void fingerprintSetup();
int readFingerprint();