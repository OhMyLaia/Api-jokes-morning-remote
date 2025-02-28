import { fetchJokeFromApi } from "../api/api-calls.js";
import { Rating, Joke } from "../models/Joke.js";

document.addEventListener("DOMContentLoaded", firstJoke);

const jokesDiv: HTMLElement | null = document.getElementById("jokes-div");
const getNextJokeBtn: HTMLElement | null = document.getElementById("next-joke-btn");
const feedbackBtn: HTMLElement | null = document.getElementById("feedback-btn");
const reportJokesArr: Array<object> = [];
let currentJoke: string = "";

async function addEventListenersFunction() {

    if (getNextJokeBtn && jokesDiv) {
        getNextJokeBtn.addEventListener("click", async event => {
            event.preventDefault();

            try {
                const joke = await fetchJokeFromApi();
                jokesDiv.innerHTML = joke;
                console.log(joke);

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

async function firstJoke() {
    const errorMessageJokes = `Ups! No jokes today :(`;
    if (jokesDiv) {
        try {
            const apiCalling = await fetchJokeFromApi();
            jokesDiv.innerHTML = apiCalling;
            currentJoke = apiCalling;
            return currentJoke;
            
        } catch {
            jokesDiv.innerHTML = errorMessageJokes;
            return null;
        }
    }
}


async function jokeRatingFun() {

    const selectedRating = document.querySelector(".joke-rating-input input:checked") as HTMLInputElement;
    // do i need this then? ->
    if (!currentJoke) { return console.error(`no joke found`) };
    if (!selectedRating) { return console.error(`no rating found`) };
    let newJokeRating: object = {};


    switch (selectedRating.value) {
        case "1" :
            newJokeRating = new Joke (currentJoke, Rating.BadRating);
            break;

        case "2" :
            newJokeRating = new Joke (currentJoke, Rating.NeutralRating);
            break;

        case "3" :
            newJokeRating = new Joke (currentJoke, Rating.GoodRating);
            break;
        default :
        console.error(`invalid rating`);
    }
    reportJokesArr.push(newJokeRating);
    console.table(reportJokesArr);
}


