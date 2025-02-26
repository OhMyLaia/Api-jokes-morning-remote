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
const api_calls_1 = require("../api/api-calls");
const sum = (a, b, printText) => {
    console.log(printText, a + b);
};
const multiplicator = (a, b, printText) => {
    console.log(printText, a * b);
};
multiplicator(2, 4, "multiplied numbers, result is...");
multiplicator(3, 4, "multiplied numbers, result is...");
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
    const getNextJokeBtn = document.getElementById("next-joke-btn");
    if (getNextJokeBtn) {
        getNextJokeBtn.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            getNextJokeBtn.innerHTML = yield (0, api_calls_1.fetchJokeFromApi)();
        }));
    }
    else {
        console.error("error next joke btn not found");
    }
}
addEventListenersFunction();
