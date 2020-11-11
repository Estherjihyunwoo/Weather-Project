function current(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  currents.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;
}

let currents = document.querySelector("#date");
let currentTime = new Date();
console.log(current(currentTime));

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0b69e36f14bcfaa42ecb4ad8f3652168";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature} °C | °F`;
  let currentLocation = document.querySelector("h1");
  let location = response.data.name;
  currentLocation.innerHTML = location;
  let lowElement = Math.round(response.data.main.temp_min);
  let low = document.querySelector("#low");
  low.innerHTML = `Low Temperature ${lowElement} °C`;
  let humidityElement = response.data.main.humidity;
  let hum = document.querySelector("#humidity");
  hum.innerHTML = `💧 Humidity ${humidityElement}%`;
  let windElement = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `🌬 Wind ${windElement} mph`;
  let feelElement = Math.round(response.data.main.feels_like);
  let element = document.querySelector("#feels");
  element.innerHTML = `Feels like ${feelElement} °C`;
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperatureElement = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${temperatureElement} °C | °F `;
  let humidityElement = response.data.main.humidity;
  let hum = document.querySelector("#humidity");
  hum.innerHTML = `💧 Humidity ${humidityElement}%`;
  let windElement = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `🌬 Wind ${windElement} mph`;
  let feelElement = Math.round(response.data.main.feels_like);
  let element = document.querySelector("#feels");
  element.innerHTML = `Feels like ${feelElement} °C`;
  let lowElement = Math.round(response.data.main.temp_min);
  let low = document.querySelector("#low");
  low.innerHTML = `Low Temperature ${lowElement} °C`;
  let dateElement = dococument.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  citySearch.innerHTML = cityInput.value;
  let apiKey = "0b69e36f14bcfaa42ecb4ad8f3652168";
  let units = "metric";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", search);

//let fahrenheitLink = document.querySelector("#fahrenheight");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

//Bonus
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 21;
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusTemperature = Math.round(temperature);
let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);

//let weather = {
//paris: {
//  temp: 19.7,
//  humidity: 80
// },
//"los angeles": {
//  temp: 21,
//  humidity: 59
//},
//seoul: {
//  temp: 30.2,
//  humidity: 20
//},
//"san francisco": {
// temp: 20.9,
//  humidity: 100
//},
//moscow: {
//  temp: -5,
//  humidity: 20
// }
//};
//let city = prompt("Enter a city?");
//city = city.toLowerCase();
//if (weather[city] !== undefined) {
// let temperature = weather[city].temp;
// let humidity = weather[city].humidity;

//alert(
// `It is currently ${celsiusTemperature}°C (${fahrenheitTemperature}°F) in ${city} with a humidity of ${humidity}%`
// );
//} else {
//alert(
//   `sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
// );
//}
