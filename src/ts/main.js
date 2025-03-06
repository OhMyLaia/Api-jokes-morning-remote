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
import { getUserLocation, fetchDifferentJokesFromApi } from "../api/api-calls.js";
document.addEventListener("DOMContentLoaded", firstJoke);
document.addEventListener("DOMContentLoaded", showWeather);
const jokesDiv = document.getElementById("jokes-div");
const getNextJokeBtn = document.getElementById("next-joke-btn");
const feedbackBtn = document.getElementById("feedback-btn");
const weatherContainer = document.getElementById("weather-span");
const reportJokesArr = [];
let currentJoke = {};
function addEventListenersFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        if (getNextJokeBtn && jokesDiv) {
            getNextJokeBtn.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                try {
                    const jokeObj1 = yield fetchJokeFromApi();
                    const jokeOb2 = yield fetchDifferentJokesFromApi();
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
        if (weatherContainer) {
            try {
                const apiWeatherCalling = yield getUserLocation();
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
    });
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
function showEmojiWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!weatherContainer) {
                return console.error(`no weather container in the htmlDOC`);
            }
            ;
            const weatherData = yield showWeather();
            if (!weatherData) {
                weatherContainer.innerHTML = `Uncertain (❓)`;
                return;
            }
            const emojiContainer = document.getElementById("emoji-span") || null;
            if (!emojiContainer) {
                return console.error(`no emoji container in the htmlDOC`);
            }
            ;
            const imgElement = createElement("weather-icon", "weather icon", emojiContainer);
            const { currentTemperature, currentClouds } = weatherData;
            if (currentTemperature < 15) {
                weatherContainer.innerHTML = `| Temperature: ${currentTemperature.toString()}°C | ❄️`;
            }
            else if (currentTemperature > 15 && currentTemperature < 25) {
                weatherContainer.innerHTML = `| Temperature: ${currentTemperature.toString()}°C | 🧥`;
            }
            else if (currentTemperature > 25) {
                weatherContainer.innerHTML = `| Temperature: ${currentTemperature.toString()}°C | 🥵`;
            }
            if (currentClouds < 20) {
                imgElement.src = "/public/images/weather-2-svgrepo-com.svg";
            }
            else if (currentClouds > 20 && currentClouds < 60) {
                imgElement.src = "/public/images/weather-sunny-and-cloudy-svgrepo-com.svg";
            }
            else if (currentClouds > 60) {
                imgElement.src = "/public/images/weather-symbol-10-svgrepo-com.svg";
            }
            else {
                imgElement.src = "/public/images/weather-severe-alert-symbolic-svgrepo-com.svg";
            }
        }
        catch (error) {
            console.error(`could not show temperature`, error);
        }
    });
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
function firstJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const errorMessageJokes = `Ups! No jokes today :(`;
        const time = currentTime("minutes");
        if (jokesDiv) {
            try {
                if (time) {
                    if (time % 2 === 0) {
                        const apiCalling = yield fetchJokeFromApi();
                        jokesDiv.innerHTML = apiCalling.joke;
                    }
                    else if (time % 2 !== 0) {
                        const secondApiCalling = yield fetchDifferentJokesFromApi();
                        const { setup, punchline } = secondApiCalling;
                        jokesDiv.innerHTML = `${setup} ... ${punchline}`;
                    }
                    else {
                        jokesDiv.innerHTML = `No jokes today`;
                    }
                }
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
