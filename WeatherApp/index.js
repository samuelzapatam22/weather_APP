
document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const city = document.getElementById('city').value; // Obtener el valor de la ciudad del campo de entrada

    try {
        const response = await axios.post('/weather', { city: city });

        if (!response.data) {
            throw new Error('Empty response');
        }

        const weatherData = response.data;

        // Mostrar los datos del clima en el elemento con id "weather-info"
        document.getElementById('weather-info').innerHTML = `
            <h2>Weather in ${city}</h2>
            <p>Temperature: ${weatherData.main.temp}°C</p>
            <p>Weather: ${weatherData.weather[0].description}</p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Mostrar un mensaje de error en el elemento con id "weather-info"
        document.getElementById('weather-info').innerHTML = '<p>Error fetching weather data</p>';
    }
});
