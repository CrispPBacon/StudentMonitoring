#pragma once
#include <HTTPClient.h>

#define PAYLOAD_SIZE 64
#define SERVER_URL "http://192.168.149.167:3000/api/attendance"

// char* httpPOST(const char* url, const char* payload);
bool sendAttendance(const char* cardUID, int fingerID);