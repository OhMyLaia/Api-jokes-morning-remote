"use strict";
class Joke {
    constructor(joke, score) {
        this._joke = joke;
        this._score = score;
        this._date = new Date().toISOString();
    }
    get joke() { return this._joke; }
    ;
    get score() { return this._score; }
    ;
    get date() { return this._date; }
    ;
    set score(newValue) {
        this._score = newValue;
    }
}
