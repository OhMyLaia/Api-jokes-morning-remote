import { fetchJokeFromApi } from "../api/api-calls.js";
import { Rating, Joke } from "../models/Joke.js";
import { getUserLocation, fetchDifferentJokesFromApi } from "../api/api-calls.js";
import { time } from "console";
import { jokeRatingFun } from "../ratings/rating.js";


document.addEventListener("DOMContentLoaded", firstJoke);

const jokesDiv: HTMLElement | null = document.getElementById("jokes-div");
const getNextJokeBtn: HTMLElement | null = document.getElementById("next-joke-btn");
const feedbackBtn: HTMLElement | null = document.getElementById("feedback-btn");
const weatherContainer: HTMLElement | null = document.getElementById("weather-span");

const reportJokesArr: Array<object> = [];
let currentJoke: object = {};

export const appGlobalVars = {
    jokesDiv,
    getNextJokeBtn,
    feedbackBtn,
    weatherContainer,
    reportJokesArr,
    currentJoke,
}

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


function currentTime(param: "hour" | "minutes" | "seconds"): number {
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
    const time: number = currentTime("minutes");

    if (jokesDiv) {
        try {
            if (time) {
                if (time % 2 === 0) {
                    const apiCalling = await fetchJokeFromApi();
                    jokesDiv.innerHTML = (apiCalling as { joke: string }).joke;

                } else if (time % 2 !== 0) {
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




