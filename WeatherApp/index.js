document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const city = document.getElementById('city').value; // Obtener el valor de la ciudad del campo de entrada

    try {
        const response = await fetch(`/weather/${city}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const weatherData = await response.json();
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
            <h2>${weatherData.name}</h2>
            <p>Temperature: ${weatherData.main.temp} °C</p>
            <p>Humidity: ${weatherData.main.humidity}%</p>
            <p>Pressure: ${weatherData.main.pressure} hPa</p>
            <p>Wind Speed: ${weatherData.wind.speed} km/h</p>
        `;

    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Mostrar un mensaje de error en el elemento con id "weather-info"
        document.getElementById('weather-info').innerHTML = '<p>Error fetching weather data</p>';
    }
});
