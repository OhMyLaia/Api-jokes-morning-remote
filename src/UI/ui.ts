import { appGlobalVars } from "../ts/main.js";
import { getUserLocation } from "../api/api-calls.js";

const appVars = {...appGlobalVars};

document.addEventListener("DOMContentLoaded", showWeather);

async function showWeather() {
    if (appVars.weatherContainer) {
        try {
            const apiWeatherCalling = await getUserLocation();
            const { hourly, current } = (apiWeatherCalling as {
                hourly: { temperature_2m: number[] }
                current: { cloud_cover: number }
            })

            const currentTemperature = hourly.temperature_2m[0];
            const currentClouds = current.cloud_cover;

            console.log(`temperature -> ${currentTemperature}`);
            console.table(`timezone -> ${JSON.stringify(apiWeatherCalling)}`);
            return { currentTemperature, currentClouds };

        } catch (error) {
            console.error(`error, weather span or api response not found`, error);
            return null;
        }
    }
}


async function showEmojiWeather() {

    try {
        if (!appVars.weatherContainer) { return console.error(`no weather container in the htmlDOC`) };

        const weatherData = await showWeather();

        if (!weatherData) {
            appVars.weatherContainer.innerHTML = `Uncertain (❓)`;
            return;
        }

        emojiForWeather(weatherData);

    } catch (error) {
        console.error(`could not show temperature`, error);
    }
}
showEmojiWeather()

function emojiForWeather(weatherData: any) {
    const emojiContainer = document.getElementById("emoji-span") as HTMLElement || null;

        if (!emojiContainer) { return console.error(`no emoji container in the htmlDOC`) };
        if (!appVars.weatherContainer) { return console.error(`no weather container`)};

        const { currentTemperature, currentClouds } = weatherData;

        if (currentTemperature < 15) {
            appVars.weatherContainer.innerHTML = `Temperature: ${currentTemperature.toString()}°C ❄️`;

        } else if (currentTemperature > 15 && currentTemperature < 25) {
            appVars.weatherContainer.innerHTML = `Temperature: ${currentTemperature.toString()}°C 🧥`;

        } else if (currentTemperature > 25) {
            appVars.weatherContainer.innerHTML = `Temperature: ${currentTemperature.toString()}°C 🥵`;
        }


        let imgID = "weather-unknown";

        if (currentClouds < 20) {
            imgID = "weather-clear";

        } else if (currentClouds > 20 && currentClouds < 60) {
            imgID = "weather-partly-cloudy";

        } else if (currentClouds > 60) {
            imgID = "weather-cloudy";
        }

        const selectedSvg = document.getElementById(imgID);
        if (selectedSvg) {
            selectedSvg.style.display = "block";
        }
}