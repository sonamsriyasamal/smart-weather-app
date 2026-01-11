const API_KEY = "dd12a19a3943921eb129b14735204922";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherInfo = document.getElementById("weatherInfo");
  const error = document.getElementById("error");

  if (city === "") {
    error.textContent = "Please enter a city name";
    weatherInfo.style.display = "none";
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        error.textContent = "City not found";
        weatherInfo.style.display = "none";
      } else {
        error.textContent = "";
        weatherInfo.style.display = "block";

        weatherInfo.innerHTML = `
          <h2>${data.name}</h2>
          <p>🌡 Temperature: ${data.main.temp} °C</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
          <p>☁ Condition: ${data.weather[0].description}</p>
        `;
      }
    })
    .catch(() => {
      error.textContent = "Error fetching data";
      weatherInfo.style.display = "none";
    });
}