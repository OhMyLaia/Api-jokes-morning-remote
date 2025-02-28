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
                const selectedRating = document.querySelector(".joke-rating-input input:checked") as HTMLInputElement;
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
    let score = (currentJoke as {score: number}).score;
    let newJokeRating: object = {};

    if (!currentJoke) {
        return console.error(`no joke found`)
    }

    if (!selectedRating) {
        return console.error(`no rating found`)
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


