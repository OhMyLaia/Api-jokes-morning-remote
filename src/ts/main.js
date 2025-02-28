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
document.addEventListener("DOMContentLoaded", firstJoke);
const jokesDiv = document.getElementById("jokes-div");
const getNextJokeBtn = document.getElementById("next-joke-btn");
const feedbackBtn = document.getElementById("feedback-btn");
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
        // do i need this then? ->
        if (!currentJoke) {
            return console.error(`no joke found`);
        }
        ;
        if (!selectedRating) {
            return console.error(`no rating found`);
        }
        ;
        let newJokeRating = {};
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
        console.table(reportJokesArr);
    });
}
