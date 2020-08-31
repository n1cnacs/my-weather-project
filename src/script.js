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
h1.innerHTML = `${day} ${month} ${date}, ${year} - ${timeHours}:${timeMinutes}:${timeSeconds}`;

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
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  let conditions = response.data.weather[0].main;
  let currentConditions = document.querySelector("#conditions");
  currentTemperature.innerHTML = `${temperature}°C`;
  currentConditions.innerHTML = `${conditions}`;
}
