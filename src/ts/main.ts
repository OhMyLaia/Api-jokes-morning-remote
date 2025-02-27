document.addEventListener("DOMContentLoaded", () => {
    addEventListenersFunction();
    fetchJokeFromApi();
});

import { fetchJokeFromApi } from "../api/api-calls.js";

//! WE ARE IN HOME-PAGE BRANCH

// <span id="weather-span">weather</span>
// <div>
//     <h1>good morning ✨</h1>
//     <div id="jokes-div"></div>
//     <button type="button" id="next-joke-btn">Next joke</button>
// </div>

const jokesDiv: HTMLElement | null = document.getElementById("jokes-div");

fetchJokeFromApi();

async function addEventListenersFunction() {
    
    const jokesDiv: HTMLElement | null = document.getElementById("jokes-div");
    const getNextJokeBtn: HTMLElement | null = document.getElementById("next-joke-btn");

    if (jokesDiv) {
        jokesDiv.innerHTML = await fetchJokeFromApi();
    }

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
}

addEventListenersFunction();