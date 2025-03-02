// import { API_KEY } from "./api-key.js";

export async function fetchJokeFromApi(): Promise<object> {
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
        const errorMssg: string = "Error, no jokes today";
        console.error(errorMssg, error);
        return;
    });
}

export function getUserLocation(): Promise<object> {
    return new Promise ((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(
    
        function(position) {
            const userLatitude: number = position.coords.latitude;
            const userLongitude: number = position.coords.longitude;
            console.log(`Latitude: ${userLatitude}, Longitude: ${userLongitude}`);
    
            resolve(fetchWeatherFromApi(userLatitude, userLongitude))},

        function(error) {
            reject(console.error("Error getting the location: ", error));
        });
    });
}

async function fetchWeatherFromApi(latitude: number, longitude: number): Promise<object> {
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude.toFixed(2)}&longitude=${longitude.toFixed(2)}&hourly=temperature_2m`)
    .then(res => res.json())
    .then( data => {
        console.log(`API weather response: ${data}`);
        return data;
    })
    .catch(error => {
        const errorMssg: string = "Error, no weather today";
        console.error(errorMssg, error);
        return;
    })

}

export async function fetchDifferentJokesFromApi() {
    return fetch(`https://official-joke-api.appspot.com/random_joke`)
    .then(res => res.json())
    .then( data => {
        console.log(`Jokes2 response: ${data.setup} ... ${data.punchline}`);
        return data;
    })
    .catch(error => {
        const errorMssg: string = "Error, no weather today";
        console.error(errorMssg, error);
        return;
    })
}