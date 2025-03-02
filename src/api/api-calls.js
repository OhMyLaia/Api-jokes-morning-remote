// import { API_KEY } from "./api-key.js";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function fetchJokeFromApi() {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch("https://icanhazdadjoke.com/", {
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
            console.log(`API response: ${data}`);
            console.log(`joke -> ${data.joke}`);
            return data;
        })
            .catch(error => {
            const errorMssg = "Error, no jokes today";
            console.error(errorMssg, error);
            return;
        });
    });
}
export function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;
            console.log(`Latitude: ${userLatitude}, Longitude: ${userLongitude}`);
            resolve(fetchWeatherFromApi(userLatitude, userLongitude));
        }, function (error) {
            reject(console.error("Error getting the location: ", error));
        });
    });
}
function fetchWeatherFromApi(latitude, longitude) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude.toFixed(2)}&longitude=${longitude.toFixed(2)}&hourly=temperature_2m`)
            .then(res => res.json())
            .then(data => {
            console.log(`API weather response: ${data}`);
            return data;
        })
            .catch(error => {
            const errorMssg = "Error, no weather today";
            console.error(errorMssg, error);
            return;
        });
    });
}
