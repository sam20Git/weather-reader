const weatherAPICall = "cfc0b8e24dec8a775280116a78e6d2fe";

const cityInput = document.getElementById("city-input");

const weatherData = document.getElementById("weather-data");

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInput.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${weatherAPICall}&units=metric`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const icon = data.weather[0].icon;
        const temperature = Math.round(data.main.temp);
        const discription = data.weather[0].description;
        const details = [
            `<h3>Feel Like</h3> <span>${Math.round(data.main.feels_like)}</span>`,
            `<h3>Humidity</h3> <span>${data.main.humidity}%</span>`,
            `<h3>Wind Speed</h3> <span>${data.wind.speed} m/s</span>`
        ];
        weatherData.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherData.querySelector(".temperature").innerHTML = `<h2>${temperature}°C</h2>`;
        weatherData.querySelector(".description").innerHTML = `<span>${discription}</span>`;
        weatherData.querySelector(".details").innerHTML = details.map((details) => `<div>${details}</div>`).join("");
    } catch (error) {
        weatherData.querySelector(".icon").innerHTML = "";
        weatherData.querySelector(".temperature").innerHTML = "";
        weatherData.querySelector(".description").textContent = "An error happened, please try again!";
        weatherData.querySelector(".details").innerHTML = "";
    }
}