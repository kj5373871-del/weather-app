async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const weatherDiv = document.getElementById('weather');

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    weatherDiv.innerHTML = "Loading...";

    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        const data = await response.json();

        const today = data.current_condition[0];

        let icon = '';
        const desc = today.weatherDesc[0].value.toLowerCase();

        if(desc.includes('sun') || desc.includes('clear')) icon = '☀️';
        else if(desc.includes('cloud')) icon = '☁️';
        else if(desc.includes('rain')) icon = '🌧️';
        else if(desc.includes('snow')) icon = '❄️';
        else icon = '🌤️';

        weatherDiv.innerHTML = `
            <div class="weather-icon">${icon}</div>
            <strong>${city}</strong><br>
            ${today.weatherDesc[0].value}<br>
            Temp: ${today.temp_C}°C | Feels like: ${today.FeelsLikeC}°C<br>
            Humidity: ${today.humidity}%
        `;
    } catch (error) {
        console.error(error);
        weatherDiv.innerHTML = "Error fetching weather data!";
    }
}
