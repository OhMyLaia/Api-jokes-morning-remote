
export async function fetchJokeFromApi(): Promise<string> {

    return fetch("https://icanhazdadjoke.com/", {
        headers: {
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        let counter: number = 0;
        counter ++;
        console.log('API Response:', data);
        console.log(`joke -> ${data.joke}`);
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
