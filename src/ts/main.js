"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
document.addEventListener("DOMContentLoaded", () => {
    addEventListenersFunction();
});
const api_calls_1 = require("../api/api-calls");
//! WE ARE IN HOME-PAGE BRANCH
// <span id="weather-span">weather</span>
// <div>
//     <h1>good morning ✨</h1>
//     <div id="jokes-div"></div>
//     <button type="button" id="next-joke-btn">Next joke</button>
// </div>
const jokesDiv = document.getElementById("jokes-div");
if (jokesDiv) {
    jokesDiv.innerHTML = "";
}
else {
    console.error("error jokes-div not found");
}
function addEventListenersFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        const getNextJokeBtn = document.getElementById("next-joke-btn");
        const jokesDiv = document.getElementById("jokes-div");
        if (getNextJokeBtn && jokesDiv) {
            getNextJokeBtn.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                try {
                    const joke = yield (0, api_calls_1.fetchJokeFromApi)();
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
