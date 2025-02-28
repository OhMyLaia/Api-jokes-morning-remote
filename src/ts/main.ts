import { fetchJokeFromApi } from "../api/api-calls.js";
import { Rating, Joke } from "../models/Joke.js";

document.addEventListener("DOMContentLoaded", firstJoke);

const jokesDiv: HTMLElement | null = document.getElementById("jokes-div");
const getNextJokeBtn: HTMLElement | null = document.getElementById("next-joke-btn");
const feedbackBtn: HTMLElement | null = document.getElementById("feedback-btn");
const reportJokesArr: Array<object> = [];
let currentJoke: object = {};

async function addEventListenersFunction() {

    if (getNextJokeBtn && jokesDiv) {
        getNextJokeBtn.addEventListener("click", async event => {
            event.preventDefault();

            try {
                const jokeObj = await fetchJokeFromApi();
                jokesDiv.innerHTML = (jokeObj as { joke: string }).joke;
                console.log(jokeObj);
                currentJoke = jokeObj;

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
            jokesDiv.innerHTML = (apiCalling as { joke : string }).joke;
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
    let joke = (currentJoke as {joke : string}).joke;
    let id = (currentJoke as {id : string}).id;

    // do i need this then? ->
    if (!currentJoke) { return console.error(`no joke found`) };
    if (!selectedRating) { return console.error(`no rating found`) };
    let newJokeRating: object = {};


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
    console.table(reportJokesArr);
}


