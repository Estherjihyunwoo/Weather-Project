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
  temperatureElement.innerHTML = `${temperature}`;
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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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

  function formatHours(timestamp) {
    return `${hours}:${minutes}`;
  }
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperatureElement = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${temperatureElement}`;
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
  //let dateElement = dococument.querySelector("#date");
  //dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}

function displayForecast(response) {
  letforecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2">
  <h3>${formatHours(forecast.dt * 1000)}</h3>
  <img src = "http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png" alt="" />
  <div class="weather-forecast-temperature">
 <strong>${Math.round(forecast.main.temp_max)}°</strong>${Math.round(
      forecast.main.temp_min
    )}
  </div>
  </div>`;
  }
}

function search(city) {
  let apiKey = "0b69e36f14bcfaa42ecb4ad8f3652168";
  let units = "metric";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  //axios.get(apiUrl).than(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  //let citySearch = document.querySelector("#city");
  let cityInputElement = document.querySelector("#city-input");
  //citySearch.innerHTML = cityInput.value;
  //let city = document.querySelector("#city-input").value;
  search(cityInputElement.value);
  search("Los Angeles");
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
