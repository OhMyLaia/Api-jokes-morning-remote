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
document.addEventListener("DOMContentLoaded", firstJoke);
const jokesDiv = document.getElementById("jokes-div");
const getNextJokeBtn = document.getElementById("next-joke-btn");
const feedbackBtn = document.getElementById("feedback-btn");
const reportJokesArr = [];
function addEventListenersFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        if (getNextJokeBtn && jokesDiv) {
            getNextJokeBtn.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                try {
                    const joke = yield fetchJokeFromApi();
                    jokesDiv.innerHTML = joke;
                    console.log(joke);
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
function firstJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const errorMessageJokes = `Ups! No jokes today :(`;
        if (jokesDiv) {
            try {
                const apiCalling = yield fetchJokeFromApi();
                jokesDiv.innerHTML = apiCalling;
            }
            catch (_a) {
                jokesDiv.innerHTML = errorMessageJokes;
            }
        }
    });
}
function jokeRatingFun() {
    return __awaiter(this, void 0, void 0, function* () {
        const jokeString = yield fetchJokeFromApi();
        const selectedRating = document.querySelector(".joke-rating-input input:checked");
        if (selectedRating) {
            console.log(`rating -> ${selectedRating.value}`);
        }
        // switch (jokeRatingInput) {
        // }
    });
}
