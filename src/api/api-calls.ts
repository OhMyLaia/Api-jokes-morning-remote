import { API_KEY } from "./api-key";

export async function fetchJokeFromApi(): Promise<object> {

    return fetch("https://icanhazdadjoke.com/", {
        headers: {
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log('API Response:', data);
        console.log(`joke -> ${data.joke}`);
        return data
    })
    .catch(error => {
        const errorMssg: string = "Error, no jokes today";
        console.error(errorMssg, error);
        return;
    });
}

export function getUserLocation() {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const userLatitude: number = position.coords.latitude;
            const userLongitude: number = position.coords.longitude;

            console.log(`Latitude: ${userLatitude}, Longitude: ${userLongitude}`);

            fetchWeatherFromApi(userLatitude, userLongitude);
                }, function(error) {
                    console.error("Error getting the location: ", error);
        });
}

export async function fetchWeatherFromApi(latitude: number, longitude: number): Promise<object> {
    
    return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_KEY}`)
}