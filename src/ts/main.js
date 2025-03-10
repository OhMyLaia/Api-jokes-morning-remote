import { fetchJokeFromApi } from "../api/api-calls.js";
import { fetchDifferentJokesFromApi } from "../api/api-calls.js";
import { jokeRatingFun } from "../ratings/rating.js";
document.addEventListener("DOMContentLoaded", firstJoke);
const jokesDiv = document.getElementById("jokes-div");
const getNextJokeBtn = document.getElementById("next-joke-btn");
const feedbackBtn = document.getElementById("feedback-btn");
const weatherContainer = document.getElementById("weather-span");
const reportJokesArr = [];
let currentJoke = {};
export const appGlobalVars = {
    jokesDiv,
    getNextJokeBtn,
    feedbackBtn,
    weatherContainer,
    reportJokesArr,
    currentJoke,
};
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
