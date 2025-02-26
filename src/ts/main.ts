import { fetchJokeFromApi } from "../api/api-calls";

type Operation = (a: number, b: number, printText: string) => void


const sum: Operation = (a, b, printText)  => {
    console.log(printText, a + b);
}

const multiplicator: Operation = (a, b, printText) => {
    console.log(printText, a * b);
}


multiplicator(2, 4, "multiplied numbers, result is...");
multiplicator(3, 4, "multiplied numbers, result is...");


//! WE ARE IN HOME-PAGE BRANCH

// <span id="weather-span">weather</span>
// <div>
//     <h1>good morning ✨</h1>
//     <div id="jokes-div"></div>
//     <button type="button" id="next-joke-btn">Next joke</button>
// </div>

const jokesDiv: HTMLElement | null = document.getElementById("jokes-div");
    if (jokesDiv) {
        jokesDiv.innerHTML = "";
    } else {
        console.error("error jokes-div not found");
    }

    function addEventListenersFunction() {
    
    const getNextJokeBtn: HTMLElement | null = document.getElementById("next-joke-btn");
    if (getNextJokeBtn) {
        getNextJokeBtn.addEventListener("click", async event => {
            event.preventDefault();
            getNextJokeBtn.innerHTML = await fetchJokeFromApi();
        }) 
    } else {
        console.error("error next joke btn not found");
    }

}

addEventListenersFunction();