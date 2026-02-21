#include "internet.h"

unsigned long lastAttempt = 0;
const unsigned long RETRY_INTERVAL = 5000;

void internetBegin() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
}

void internetLoop() {
  if (millis() - lastAttempt > RETRY_INTERVAL) {
    lastAttempt = millis();
    WiFi.disconnect();
    WiFi.begin(WIFI_SSID, WIFI_PASS);
  }
}

bool internetConnected() {
  return WiFi.status() == WL_CONNECTED;
}

void connectToInternet() {
  while(!internetConnected()) {
    internetLoop();
    Serial.println("Connecting...");
    blinkLed();
    delay(300);

    if (internetConnected()) {
      Serial.println("Connected!");
    }
  }
}