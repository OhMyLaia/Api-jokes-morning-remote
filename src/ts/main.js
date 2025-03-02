var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchJokeFromApi } from "../api/api-calls.js";
import { Rating, Joke } from "../models/Joke.js";
import { getUserLocation } from "../api/api-calls.js";
document.addEventListener("DOMContentLoaded", firstJoke);
document.addEventListener("DOMContentLoaded", showWeather);
const jokesDiv = document.getElementById("jokes-div");
const getNextJokeBtn = document.getElementById("next-joke-btn");
const feedbackBtn = document.getElementById("feedback-btn");
const weatherSpan = document.getElementById("weather-span");
const reportJokesArr = [];
let currentJoke = {};
function addEventListenersFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        if (getNextJokeBtn && jokesDiv) {
            getNextJokeBtn.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                try {
                    const jokeObj = yield fetchJokeFromApi();
                    jokesDiv.innerHTML = jokeObj.joke;
                    console.log(jokeObj);
                    currentJoke = jokeObj;
                    const selectedRating = document.querySelector("input[name='inlineRadioOptions']:checked");
                    selectedRating.checked = false;
                }
                catch (error) {
                    console.error("error, next joke btn not found", error);
                }
            }));
        }
        else {
            console.error(`Next-joke-btn or jokes-div not found`);
        }
        if (feedbackBtn && jokesDiv) {
            feedbackBtn.addEventListener("click", jokeRatingFun);
        }
    });
}
addEventListenersFunction();
function showWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        if (weatherSpan) {
            try {
                const apiWeatherCalling = yield getUserLocation();
                const currentTemperature = apiWeatherCalling
                    .hourly.temperature_2m[0];
                console.log(`temperature -> ${currentTemperature}`);
                // weatherSpan.innerHTML = `Temperature: ${currentTemperature.toString()}°C`;
                console.table(`timezone -> ${JSON.stringify(apiWeatherCalling)}`);
                return currentTemperature;
            }
            catch (error) {
                console.error(`error, weather span or api response not found`, error);
            }
        }
    });
}
// showWeather();
function showEmojiWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const temperature = yield showWeather();
            if (temperature && weatherSpan) {
                if (temperature < 15) {
                    weatherSpan.innerHTML = `Temperature: ${temperature.toString()}°C ❄️`;
                }
                else if (temperature > 15 && temperature < 25) {
                    weatherSpan.innerHTML = `Temperature: ${temperature.toString()}°C 🧥`;
                }
                else if (temperature > 25) {
                    weatherSpan.innerHTML = `Temperature: ${temperature.toString()}°C 🥵`;
                }
            }
            else if (weatherSpan) {
                weatherSpan.innerHTML = `Uncertain ❓`;
            }
        }
        catch (error) {
            console.error(`could not show temperature`, error);
        }
    });
}
showEmojiWeather();
function firstJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const errorMessageJokes = `Ups! No jokes today :(`;
        if (jokesDiv) {
            try {
                const apiCalling = yield fetchJokeFromApi();
                jokesDiv.innerHTML = apiCalling.joke;
                currentJoke = apiCalling;
                return currentJoke;
            }
            catch (_a) {
                jokesDiv.innerHTML = errorMessageJokes;
                return null;
            }
        }
    });
}
function jokeRatingFun() {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
