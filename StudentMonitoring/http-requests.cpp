#include "http-requests.h";

char* httpPOST(const char* url, const char* payload) {
    static char responseBuffer[512];  // adjust size if needed
    responseBuffer[0] = '\0';

    HTTPClient http;
    http.begin(url);
    http.addHeader("Content-Type", "application/json"); // change if needed

    int httpResponseCode = http.POST(payload);

    if (httpResponseCode > 0) {
        String response = http.getString();
        response.toCharArray(responseBuffer, sizeof(responseBuffer));
    } else {
        strcpy(responseBuffer, "HTTP POST failed");
    }

    http.end();
    return responseBuffer;
}


bool sendAttendance(const char* cardUID, int fingerID) {
    char payload[PAYLOAD_SIZE];
    snprintf(payload, sizeof(payload),
         "{\"card_id\":\"%s\",\"finger_id\":%d}",
         cardUID, fingerID);

    char* response = httpPOST(SERVER_URL, payload);

    if (response != nullptr) {
        Serial.println(response);
        return true;
    }

    Serial.println("HTTP request failed");
    return false;
}