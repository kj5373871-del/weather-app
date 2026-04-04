const apiKey = "YOUR_REAL_API_KEY"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("city").value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  // Use India as default country code (change if needed)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data); // debug

    if (data.cod != 200) {
      alert(data.message); // shows real error: city not found / invalid key
      return;
    }

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = `🌡️ Temp: ${data.main.temp}°C`;
    document.getElementById("desc").innerText = `☁️ ${data.weather[0].description}`;
    document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").innerText = `🌬️ Wind: ${data.wind.speed} m/s`;

    document.getElementById("weather").classList.remove("hidden");

  } catch (error) {
    console.error("Error:", error);
    alert("Failed to fetch weather");
  }
}