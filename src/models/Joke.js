var Rating;
(function (Rating) {
    Rating[Rating["BadRating"] = 1] = "BadRating";
    Rating[Rating["NeutralRating"] = 2] = "NeutralRating";
    Rating[Rating["GoodRating"] = 3] = "GoodRating";
})(Rating || (Rating = {}));
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
export { Rating, Joke };
