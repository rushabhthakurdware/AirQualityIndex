import axios from "axios";

const API_KEY = "26cbc74ff9420916916b1461cea0cdb2"; // 🔁 Replace with your actual key
const limit = 5;
// 1. Get coordinates of the city
export const getCityCoordinates = async (city) => {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${API_KEY}`;
  const res = await axios.get(url);
  if (res.data.length === 0) throw new Error("City not found");
  return res.data[0]; // contains lat, lon
};

// 2. Get air pollution + weather data
export const getAirQualityData = async (lat, lon) => {
  // Air Quality
  const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const airRes = await axios.get(airUrl);

  // Weather
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const weatherRes = await axios.get(weatherUrl);

  return {
    aqi: airRes.data.list[0].main.aqi,
    components: airRes.data.list[0].components,
    temp: weatherRes.data.main.temp,
    wind: weatherRes.data.wind.speed,
    humidity: weatherRes.data.main.humidity,
    city: weatherRes.data.name,
  };
};
// 3. Get city suggestions for autocomplete
export const getCitySuggestions = async (query) => {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${API_KEY}`;
  const res = await axios.get(url);
  return res.data; // returns an array of matching cities
};

