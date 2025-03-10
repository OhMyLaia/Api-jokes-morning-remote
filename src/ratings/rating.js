import { appGlobalVars } from "../ts/main.js";
const appVars = { ...appGlobalVars };
import { Rating, Joke } from "../models/Joke.js";
const feedbackMessage = document.getElementById("feedback-mssg");
export async function jokeRatingFun() {
    const selectedRating = document.querySelector(".joke-rating-input input:checked");
    let joke = appVars.currentJoke.joke;
    let id = appVars.currentJoke.id;
    // let score = (appVars.currentJoke as {score: number}).score;
    let newJokeRating = {};
    if (!appVars.currentJoke) {
        return console.error(`no joke found`);
    }
    if (!selectedRating) {
        return console.error(`no rating found`);
    }
    let repeatedJoke = appVars.reportJokesArr.find(element => {
        let jokesId = element.id;
        console.log(`this is jokesId -> ${jokesId} and this is id -> ${id}`);
        if (jokesId === id) {
            return element;
        }
    });
    console.log(`this is repeatedJoke -> ${repeatedJoke}`);
    if (!repeatedJoke) {
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
        appVars.reportJokesArr.push(newJokeRating);
        if (feedbackMessage) {
            feedbackMessage.innerHTML = `Thank you! Have a nice day!`;
        }
    }
    else {
        repeatedJoke.score = parseInt(selectedRating.value);
    }
    console.log(`this is repeatedJoke -> ${repeatedJoke}`);
    console.table(appVars.reportJokesArr);
}
