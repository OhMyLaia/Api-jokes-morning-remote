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
async function fetchWeatherFromApi(latitude, longitude) {
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude.toFixed(2)}&longitude=${longitude.toFixed(2)}&current=cloud_cover&hourly=temperature_2m`)
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
}
export async function fetchJokeFromApi() {
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
}
export async function fetchDifferentJokesFromApi() {
    return fetch(`https://official-joke-api.appspot.com/random_joke`)
        .then(res => res.json())
        .then(data => {
        console.log(`Jokes2 response: ${data.setup} ... ${data.punchline}`);
        return data;
    })
        .catch(error => {
        const errorMssg = "Error, no weather today";
        console.error(errorMssg, error);
        return;
    });
}
