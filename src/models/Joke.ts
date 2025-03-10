enum Rating {
    BadRating = 1,
    NeutralRating,
    GoodRating
}


class Joke {
    private _joke: string;
    private _score: Rating;
    private _date: string;
    private _id: string;

    constructor (joke: string, score: Rating, id: string) {
        this._joke = joke;
        this._score = score;
        this._date = new Date().toISOString();
        this._id = id;
    }


    get joke () : string { return this._joke };
    get score () : Rating { return this._score };
    get date () : string { return this._date };
    get id () : string { return this._id };

    set score (newValue : number) {
        this._score = newValue;
    }
}

export { Rating, Joke };