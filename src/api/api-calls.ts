
export async function fetchJokeFromApi(): Promise<string> {
    let counter: number = 0;

    return fetch("https://icanhazdadjoke.com/", {
        headers: {
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log('API Response:', data);
        console.log(`joke -> ${data.joke}`);
        counter++
        console.log(`counting -> ${counter}`);
        return data.joke;
    })
    .catch(error => {
        const errorMssg: string = "Error, no jokes today";
        console.error(errorMssg, error);
        return errorMssg;
    });
}

// export async function firstFetchedJokeFromApi() {
    
// }
