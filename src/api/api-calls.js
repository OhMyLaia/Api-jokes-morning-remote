var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function fetchJokeFromApi() {
    return __awaiter(this, void 0, void 0, function* () {
        let counter = 0;
        return fetch("https://icanhazdadjoke.com/", {
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
            console.log('API Response:', data);
            console.log(`joke -> ${data.joke}`);
            counter++;
            console.log(`counting -> ${counter}`);
            return data.joke;
        })
            .catch(error => {
            const errorMssg = "Error, no jokes today";
            console.error(errorMssg, error);
            return errorMssg;
        });
    });
}
// export async function firstFetchedJokeFromApi() {
// }
