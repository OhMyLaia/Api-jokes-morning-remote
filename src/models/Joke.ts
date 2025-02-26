class Joke {
    private _joke: string;
    private _score: number;
    private _date: string;

    constructor (joke: string, score: number) {
        this._joke = joke;
        this._score = score;
        this._date = new Date().toISOString();
    }


    get joke () : string { return this._joke };
    get score () : number { return this._score };
    get date () : string { return this._date };

    set score (newValue : number) {
        this._score = newValue;
    }
}