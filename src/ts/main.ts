import { fetchJokeFromApi } from "../api/api-calls.js";

document.addEventListener("DOMContentLoaded", firstJoke);

const jokesDiv: HTMLElement | null = document.getElementById("jokes-div");
const getNextJokeBtn: HTMLElement | null = document.getElementById("next-joke-btn");
const feedbackBtn: HTMLElement | null = document.getElementById("feedback-btn");
const reportJokesArr: Array<object> = [];

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
            
        } catch {
            jokesDiv.innerHTML = errorMessageJokes;
        }
    }
}


async function jokeRatingFun() {

    const jokeString: string = await fetchJokeFromApi();
    const selectedRating = document.querySelector(".joke-rating-input input:checked") as HTMLInputElement;
    // do i need this then? ->
    selectedRating ? selectedRating.value : 0;

    if (selectedRating.value === Rating[1]) {
        const newJokeRating = new Joke (jokeString, 1);
        reportJokesArr.push(newJokeRating);
        console.table(reportJokesArr);

    } else if (selectedRating.value === Rating[2]) {
        const newJokeRating = new Joke (jokeString, 2);
        reportJokesArr.push(newJokeRating);
        console.table(reportJokesArr);

    } else if (selectedRating.value === Rating[3]) {
        const newJokeRating = new Joke (jokeString, 3);
        reportJokesArr.push(newJokeRating);
        console.table(reportJokesArr);

    } else {
        console.error(`This joke could not be rated`);
    }

}