const apiKey = "demo"; // demo key

document.getElementById("city").addEventListener("keypress", function(e){
  if(e.key === "Enter") getWeather();
});

async function getWeather() {
  const city = document.getElementById("city").value;

  if(city === "") return alert("Enter city");

  showLoader(true);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  const data = await res.json();

  showLoader(false);

  if(data.cod != 200) {
    alert("City not found ❌");
    return;
  }

  updateUI(data);
}

function updateUI(data) {
  document.getElementById("name").innerText = data.name;
  document.getElementById("temp").innerText = `🌡 ${data.main.temp} °C`;
  document.getElementById("desc").innerText = data.weather[0].description;
  document.getElementById("humidity").innerText = `💧 ${data.main.humidity}%`;
  document.getElementById("wind").innerText = `🌬 ${data.wind.speed} km/h`;

  const iconCode = data.weather[0].icon;
  document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  document.getElementById("card").classList.remove("hidden");

  changeBackground(data.weather[0].main);
}

function showLoader(show) {
  document.getElementById("loader").classList.toggle("hidden", !show);
}

function changeBackground(weather) {
  const body = document.body;

  if(weather === "Clear")
    body.style.background = "linear-gradient(135deg,#fceabb,#f8b500)";
  else if(weather === "Clouds")
    body.style.background = "linear-gradient(135deg,#bdc3c7,#2c3e50)";
  else if(weather === "Rain")
    body.style.background = "linear-gradient(135deg,#4b79a1,#283e51)";
  else
    body.style.background = "linear-gradient(135deg,#36d1dc,#5b86e5)";
}
