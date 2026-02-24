#include <curl/curl.h>
#include <iostream>
#include <string>
#include <nlohmann/json.hpp>

size_t WriteCallback(void* contents, size_t size, size_t nmemb, void* userp) {
    ((std::string*)userp)->append((char*)contents, size * nmemb);
    return size * nmemb;
}

int main() {
    CURL* curl;
    CURLcode res;
    std::string readBuffer;

    curl = curl_easy_init();
    if(curl) {
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Authorization: Bearer YOUR_API_KEY"); 
        headers = curl_slist_append(headers, "Content-Type: application/json");

        curl_easy_setopt(curl, CURLOPT_URL, "https://api.aisool.com/v1/chat/completions");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS,
            "{"model":"sool-max","messages":[{"role":"user","content":"Hello AI!"}]}"
        );
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &readBuffer);

        res = curl_easy_perform(curl);
        curl_easy_cleanup(curl);
        curl_slist_free_all(headers);

        if(res == CURLE_OK) {
            auto json = nlohmann::json::parse(readBuffer);
            auto message = json["choices"][0]["message"];
            std::cout << "Role: " << message.value("role", "") << std::endl;
            std::cout << "Content: " << message.value("content", "") << std::endl;
            std::cout << "Finish Reason: " << json["choices"][0].value("finish_reason", "") << std::endl;
            std::cout << "Usage: " << json.value("usage", nlohmann::json::object()) << std::endl;
        } else {
            std::cerr << "CURL Error: " << curl_easy_strerror(res) << std::endl;
        }
    }
}

// image generation
#include <curl/curl.h>
#include <iostream>
#include <nlohmann/json.hpp>

int main() {
    CURL* curl = curl_easy_init();
    if(curl) {
        std::string readBuffer;
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Authorization: Bearer YOUR_API_KEY"); 
        headers = curl_slist_append(headers, "Content-Type: application/json");

        curl_easy_setopt(curl, CURLOPT_URL, "https://api.aisool.com/v1/images/generations");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "{"prompt":"A fantasy forest","n":1,"size":"1024x1024"}");
        
        auto json = nlohmann::json::parse(readBuffer);
        std::cout << "Image Data: " << json["data"][0]["url"] << std::endl;
        curl_easy_cleanup(curl);
    }
}
