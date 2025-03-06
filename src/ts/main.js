import { fetchJokeFromApi } from "../api/api-calls.js";
import { Rating, Joke } from "../models/Joke.js";
import { getUserLocation, fetchDifferentJokesFromApi } from "../api/api-calls.js";
// importae y luego con variable
document.addEventListener("DOMContentLoaded", firstJoke);
document.addEventListener("DOMContentLoaded", showWeather);
const jokesDiv = document.getElementById("jokes-div");
const getNextJokeBtn = document.getElementById("next-joke-btn");
const feedbackBtn = document.getElementById("feedback-btn");
const weatherContainer = document.getElementById("weather-span");
const reportJokesArr = [];
let currentJoke = {};
async function addEventListenersFunction() {
    if (getNextJokeBtn && jokesDiv) {
        getNextJokeBtn.addEventListener("click", async (event) => {
            event.preventDefault();
            try {
                const jokeObj1 = await fetchJokeFromApi();
                const jokeOb2 = await fetchDifferentJokesFromApi();
                let randomNum = Math.random() * 11;
                if (randomNum % 2 === 0) {
                    const joke1 = jokeObj1.joke;
                    jokesDiv.innerHTML = joke1;
                    console.log(`joke1 -> ${jokeObj1}`);
                }
                else {
                    const { setup, punchline } = jokeOb2;
                    jokesDiv.innerHTML = `${setup} ... ${punchline}`;
                    console.log(`joke2 -> ${setup} ... ${punchline}`);
                }
                const selectedRating = document.querySelector("input[name='inlineRadioOptions']:checked");
                selectedRating.checked = false;
            }
            catch (error) {
                console.error("error, next joke btn not found", error);
            }
        });
    }
    else {
        console.error(`Next-joke-btn or jokes-div not found`);
    }
    if (feedbackBtn && jokesDiv) {
        feedbackBtn.addEventListener("click", jokeRatingFun);
    }
}
addEventListenersFunction();
async function showWeather() {
    if (weatherContainer) {
        try {
            const apiWeatherCalling = await getUserLocation();
            const { hourly, current } = apiWeatherCalling;
            const currentTemperature = hourly.temperature_2m[0];
            const currentClouds = current.cloud_cover;
            console.log(`temperature -> ${currentTemperature}`);
            // weatherContainer.innerHTML = `Temperature: ${currentTemperature.toString()}°C`;
            console.table(`timezone -> ${JSON.stringify(apiWeatherCalling)}`);
            return { currentTemperature, currentClouds };
        }
        catch (error) {
            console.error(`error, weather span or api response not found`, error);
            return null;
        }
    }
}
// showWeather();
function createElement(id, alt, container) {
    let imgToShow = document.createElement("img");
    imgToShow.id = id;
    imgToShow.alt = alt;
    imgToShow.width = 40;
    imgToShow.height = 40;
    container.appendChild(imgToShow);
    return imgToShow;
}
async function showEmojiWeather() {
    try {
        if (!weatherContainer) {
            return console.error(`no weather container in the htmlDOC`);
        }
        ;
        const weatherData = await showWeather();
        if (!weatherData) {
            weatherContainer.innerHTML = `Uncertain (❓)`;
            return;
        }
        const emojiContainer = document.getElementById("emoji-span") || null;
        if (!emojiContainer) {
            return console.error(`no emoji container in the htmlDOC`);
        }
        ;
        const { currentTemperature, currentClouds } = weatherData;
        if (currentTemperature < 15) {
            weatherContainer.innerHTML = `Temperature: ${currentTemperature.toString()}°C ❄️`;
        }
        else if (currentTemperature > 15 && currentTemperature < 25) {
            weatherContainer.innerHTML = `Temperature: ${currentTemperature.toString()}°C 🧥`;
        }
        else if (currentTemperature > 25) {
            weatherContainer.innerHTML = `Temperature: ${currentTemperature.toString()}°C 🥵`;
        }
        let imgID = "weather-unknown";
        if (currentClouds < 20) {
            imgID = "weather-clear";
        }
        else if (currentClouds > 20 && currentClouds < 60) {
            imgID = "weather-partly-cloudy";
        }
        else if (currentClouds > 60) {
            imgID = "weather-cloudy";
        }
        const selectedSvg = document.getElementById(imgID);
        if (selectedSvg) {
            selectedSvg.style.display = "block";
        }
    }
    catch (error) {
        console.error(`could not show temperature`, error);
    }
}
showEmojiWeather();
function currentTime(param) {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    switch (param) {
        case "hour":
            return hour;
        case "minutes":
            return minutes;
        case "seconds":
            return seconds;
        default:
            throw new Error("Invalid parameter");
    }
}
async function firstJoke() {
    const errorMessageJokes = `Ups! No jokes today :(`;
    const time = currentTime("minutes");
    if (jokesDiv) {
        try {
            if (time) {
                if (time % 2 === 0) {
                    const apiCalling = await fetchJokeFromApi();
                    jokesDiv.innerHTML = apiCalling.joke;
                }
                else if (time % 2 !== 0) {
                    const secondApiCalling = await fetchDifferentJokesFromApi();
                    const { setup, punchline } = secondApiCalling;
                    jokesDiv.innerHTML = `${setup} ... ${punchline}`;
                }
                else {
                    jokesDiv.innerHTML = `No jokes today`;
                }
            }
        }
        catch {
            jokesDiv.innerHTML = errorMessageJokes;
            return null;
        }
    }
}
async function jokeRatingFun() {
    const selectedRating = document.querySelector(".joke-rating-input input:checked");
    let joke = currentJoke.joke;
    let id = currentJoke.id;
    let score = currentJoke.score;
    let newJokeRating = {};
    if (!currentJoke) {
        return console.error(`no joke found`);
    }
    if (!selectedRating) {
        return console.error(`no rating found`);
    }
    // this returns the object that is repeated
    let repeatedJoke = reportJokesArr.find(element => {
        let jokesId = element.id;
        console.log(`this is jokesId -> ${jokesId} and this is id -> ${id}`);
        if (jokesId === id) {
            return element;
        }
    });
    console.log(`this is repeatedJoke -> ${repeatedJoke}`);
    if (!repeatedJoke) {
        switch (selectedRating.value) {
            case "1":
                newJokeRating = new Joke(joke, Rating.BadRating, id);
                break;
            case "2":
                newJokeRating = new Joke(joke, Rating.NeutralRating, id);
                break;
            case "3":
                newJokeRating = new Joke(joke, Rating.GoodRating, id);
                break;
            default:
                console.error(`invalid rating`);
        }
        reportJokesArr.push(newJokeRating);
    }
    else {
        // let repeatedJokeScore: number = (repeatedJoke as {score: number}).score;
        // console.log(`this is the repeated score -> `)
        // repeatedJokeScore = parseInt(selectedRating.value);
        repeatedJoke.score = parseInt(selectedRating.value);
    }
    console.log(`this is repeatedJoke -> ${repeatedJoke}`);
    console.table(reportJokesArr);
}
