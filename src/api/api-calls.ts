
export function fetchJokeFromApi(): Promise<string> {

    return fetch("https://icanhazdadjoke.com/", {
        headers: {
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => { 
        console.log(`joke -> ${data.joke}`);
        return data.joke;
    })
    .catch(error => {
        error = "Error, no jokes today";
        console.error(error);
        return error;
    });
}
