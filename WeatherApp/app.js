const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 2222;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get("/weather/:city", async (req, res) => {
    const city = req.params.city;

    try {
        const weatherData = await getRealWeatherData(city);
        res.json(weatherData);
    } catch (error) {
        console.error("Error fetching real weather data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/weather", async (req, res) => {
    const city = req.body.city;

    try {
        const weatherData = await getRealWeatherData(city);
        res.json(weatherData);
    } catch (error) {
        console.error("Error fetching real weather data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

async function getRealWeatherData(city) {
    const apiKey = '1c78da2e186c63f952450c9b21bc8a5b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching real weather data:", error);
        throw error;
    }
}

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
