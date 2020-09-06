let display = document.querySelector("h1");

// display the current date and time using Javascript

let now = new Date();

let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat", "Sun"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];

let date = now.getDate();
let year = now.getFullYear();
let timeHours = now.getHours();
let timeMinutes = now.getMinutes();
let timeSeconds = now.getSeconds();

let h1 = document.querySelector("h1");
h1.innerHTML = `${day}, ${date} ${month} ${year} - ${timeHours}:${timeMinutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let h2 = document.querySelector("#current-city-name");
  h2.innerHTML = `${searchInput.value}`;

  let apiKey = "345722e52259467f443ef34f8686ffec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let conditions = response.data.weather[0].main;
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let feels = Math.round(response.data.main.feels_like);

  let currentTemperature = document.querySelector("#current-temperature");
  let currentConditions = document.querySelector("#conditions");
  let windSpeed = document.querySelector("#wind-speed");
  let currentHumidity = document.querySelector("#humidity");
  let feelsLike = document.querySelector("#feels-like");
  let currentCityIcon = document.querySelector("#weather-icon");

  celciusTemperature = response.data.main.temp;
  feelsLikeTemperature = response.data.main.feels_like;

  currentTemperature.innerHTML = `${temperature}`;
  currentConditions.innerHTML = `${conditions}`;
  windSpeed.innerHTML = `${wind}km/h`;
  currentHumidity.innerHTML = `${humidity}%`;
  feelsLike.innerHTML = `${feels}`;

  currentCityIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  currentCityIcon.setAttribute("alt", response.data.weather[0].description);
}

function showFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  celciusLink.classList.remove("active");
  temperatureLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);

  let feelTemperature = document.querySelector("#feels-like");
  let feelsTemperature = (feelsLikeTemperature * 9) / 5 + 32;
  feelTemperature.innerHTML = Math.round(feelsTemperature);
}

function showCelcius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  celciusLink.classList.add("active");
  temperatureLink.classList.remove("active");
  currentTemperature.innerHTML = Math.round(celciusTemperature);

  let feelTemperature = document.querySelector("#feels-like");
  feelTemperature.innerHTML = Math.round(feelsLikeTemperature);
}

let celciusTemperature = null;
let feelsLikeTemperature = null;

let temperatureLink = document.querySelector("#temperature-link");
temperatureLink.addEventListener("click", showFahrenheit);

let celciusLink = document.querySelector("#temperature-link-c");
celciusLink.addEventListener("click", showCelcius);
