import { fetchJokeFromApi } from "../api/api-calls.js";
import { Rating, Joke } from "../models/Joke.js";
import { getUserLocation, fetchDifferentJokesFromApi } from "../api/api-calls.js";
import { time } from "console";

document.addEventListener("DOMContentLoaded", firstJoke);
document.addEventListener("DOMContentLoaded", showWeather);


const jokesDiv: HTMLElement | null = document.getElementById("jokes-div");
const getNextJokeBtn: HTMLElement | null = document.getElementById("next-joke-btn");
const feedbackBtn: HTMLElement | null = document.getElementById("feedback-btn");
const weatherSpan: HTMLElement | null = document.getElementById("weather-span");

const reportJokesArr: Array<object> = [];
let currentJoke: object = {};

async function addEventListenersFunction() {
    if (getNextJokeBtn && jokesDiv) {
        getNextJokeBtn.addEventListener("click", async event => {
            event.preventDefault();

            try {
                const jokeObj1 = await fetchJokeFromApi();
                const jokeOb2 = await fetchDifferentJokesFromApi()

                let randomNum = Math.random() * 11;

                if (randomNum % 2 === 0) {
                    const joke1 = (jokeObj1 as { joke: any }).joke;
                    jokesDiv.innerHTML = joke1;
                    console.log(`joke1 -> ${jokeObj1}`);
                } else {
                    const { setup, punchline } = jokeOb2 as { setup: string; punchline: string }; 
                    jokesDiv.innerHTML = `${setup} ... ${punchline}`;
                    console.log(`joke2 -> ${setup} ... ${punchline}`);
                }
                const selectedRating = document.querySelector("input[name='inlineRadioOptions']:checked") as HTMLInputElement;
                selectedRating.checked = false;

            } catch (error) {
                console.error("error, next joke btn not found", error);
            }
        });

    } else {
        console.error(`Next-joke-btn or jokes-div not found`);
    }

    if (feedbackBtn && jokesDiv) {
        feedbackBtn.addEventListener("click", jokeRatingFun);
    }
}

addEventListenersFunction();

async function showWeather() {
    if (weatherSpan) {
        try {
            const apiWeatherCalling = await getUserLocation();
            const currentTemperature = (apiWeatherCalling as {
                hourly : { temperature_2m : number[] }
            })
            .hourly.temperature_2m[0];
            
            console.log(`temperature -> ${currentTemperature}`)
            // weatherSpan.innerHTML = `Temperature: ${currentTemperature.toString()}°C`;
            console.table(`timezone -> ${JSON.stringify(apiWeatherCalling)}`);
            return currentTemperature;

        } catch(error) {
        console.error(`error, weather span or api response not found`, error)
        }
    }
}
// showWeather();

async function showEmojiWeather() {
    try {
        const temperature = await showWeather();
        if (temperature && weatherSpan) {
            if (temperature < 15) {
                weatherSpan.innerHTML = `Temperature: ${temperature.toString()}°C ❄️`;

            } else if (temperature > 15 && temperature < 25) {
                weatherSpan.innerHTML = `Temperature: ${temperature.toString()}°C 🧥`;

            } else if (temperature > 25) {
                weatherSpan.innerHTML = `Temperature: ${temperature.toString()}°C 🥵`;
            }
        } else if (weatherSpan) {
            weatherSpan.innerHTML = `Uncertain ❓`;
        }

    } catch (error) {
        console.error(`could not show temperature`, error);

    }
}
showEmojiWeather()

function currentTime(param: "hour" | "minutes" | "seconds"): number {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    switch (param) {
        case "hour":
            return hour;

        case "minutes" :
            return minutes;

        case "seconds" :
            return seconds;
        
        default:
            throw new Error("Invalid parameter");
    }
}

async function firstJoke() {
    const errorMessageJokes = `Ups! No jokes today :(`;
    const time: number = currentTime("minutes");

    if (jokesDiv) {
        try {
            if (time) {
                if (time % 2 === 0) {
                    const apiCalling = await fetchJokeFromApi();
                    jokesDiv.innerHTML = (apiCalling as {joke : string}).joke;

                } else if (time % 2 !== 0){
                    const secondApiCalling = await fetchDifferentJokesFromApi();
                    const { setup, punchline } = secondApiCalling as { setup: string; punchline: string };
                    jokesDiv.innerHTML = `${setup} ... ${punchline}`;
                } else {
                    jokesDiv.innerHTML = `No jokes today`;
                }
            }

        } catch {
            jokesDiv.innerHTML = errorMessageJokes;
            return null;
        }
    }
}


async function jokeRatingFun() {

    const selectedRating = document.querySelector(".joke-rating-input input:checked") as HTMLInputElement;
    let joke = (currentJoke as {joke : string}).joke;
    let id = (currentJoke as {id : string}).id;
    let score = (currentJoke as {score: number}).score;
    let newJokeRating: object = {};

    if (!currentJoke) {
        return console.error(`no joke found`);
    }

    if (!selectedRating) {
        return console.error(`no rating found`);
    }


    // this returns the object that is repeated
    let repeatedJoke = reportJokesArr.find( element => {
        let jokesId = (element as {id : string}).id
        console.log(`this is jokesId -> ${jokesId} and this is id -> ${id}`);
        if (jokesId === id) {
            return element;
        }
    });
    console.log(`this is repeatedJoke -> ${repeatedJoke}`);

    if (!repeatedJoke) {

        switch (selectedRating.value) {
            case "1" :
                newJokeRating = new Joke (joke, Rating.BadRating, id);
                break;
    
            case "2" :
                newJokeRating = new Joke (joke, Rating.NeutralRating, id);
                break;
    
            case "3" :
                newJokeRating = new Joke (joke, Rating.GoodRating, id);
                break;
    
            default :
            console.error(`invalid rating`);
        }
    reportJokesArr.push(newJokeRating);

    } else {
        // let repeatedJokeScore: number = (repeatedJoke as {score: number}).score;
        // console.log(`this is the repeated score -> `)
        // repeatedJokeScore = parseInt(selectedRating.value);
        (repeatedJoke as { score: Rating }).score = parseInt(selectedRating.value);
    }
    console.log(`this is repeatedJoke -> ${repeatedJoke}`);
    console.table(reportJokesArr);
}


