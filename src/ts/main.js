var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    addEventListenersFunction();
});
import { fetchJokeFromApi } from "../api/api-calls.js";
//! WE ARE IN HOME-PAGE BRANCH
// <span id="weather-span">weather</span>
// <div>
//     <h1>good morning ✨</h1>
//     <div id="jokes-div"></div>
//     <button type="button" id="next-joke-btn">Next joke</button>
// </div>
const jokesDiv = document.getElementById("jokes-div");
function addEventListenersFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        const jokesDiv = document.getElementById("jokes-div");
        const getNextJokeBtn = document.getElementById("next-joke-btn");
        if (getNextJokeBtn && jokesDiv) {
            getNextJokeBtn.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                try {
                    const joke = yield fetchJokeFromApi();
                    console.log(joke);
                    jokesDiv.innerHTML = joke;
                }
                catch (error) {
                    console.error("error, next joke btn not found", error);
                }
            }));
        }
        else {
            console.error(`Next-joke-btn or jokes-div not found`);
        }
    });
}
addEventListenersFunction();
