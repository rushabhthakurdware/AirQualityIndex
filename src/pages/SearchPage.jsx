import React, { useState } from "react";
import { getAirQualityData, getCityCoordinates } from "../utils/api";
import Header from "../components/Header";
import Main from "../components/Main";
import AQICard from "../components/AQICard";
import InfoCard from "../components/InfoCard";
import DayForecastCard from "../components/DayForecastCard";
import HourlyForecastCard from "../components/HourlyForecastCard";
import { useNavigate } from "react-router-dom";
import { Oval } from 'react-loader-spinner';

function SearchPage() {
  const [loading, setLoading] = useState(false);

  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      setError("");
      setLoading(true);

      const { lat, lon } = await getCityCoordinates(city);
      const result = await getAirQualityData(lat, lon);

      setData(result);
      // Save to localStorage
    const previous = JSON.parse(localStorage.getItem("aqi-history")) || [];
    const now = new Date().toLocaleString();
    const newEntry = { city: city, time: now };
    const updated = [newEntry, ...previous].slice(0, 10); // keep last 10 entries
    localStorage.setItem("aqi-history", JSON.stringify(updated));

    } catch (err) {
      setError("City not found or API error.");
    }finally{
      setLoading(false);
    }
  };

  

  const handleCurrentLocation = () => {
    navigate("/current");
  };

  const handleHistory = () => {
    navigate("/history");
  };

  return (
    <>
      <Header
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
        onCurrentLocation={handleCurrentLocation}
        onHistory={handleHistory}
      />

<Main>
  {error && <p className="text-red-500">{error}</p>}

  {loading ? (
    <div className="flex justify-center items-center h-40">
      <Oval
        height={50}
        width={50}
        color="#10b981"
        secondaryColor="#d1fae5"
        strokeWidth={4}
        ariaLabel="loading"
      />
    </div>
  ) : (
    data && (
      <>
        <AQICard aqi={data.aqi * 50} status={getAQIStatus(data.aqi)} />
        <InfoCard
          temp={data.temp}
          wind={data.wind}
          humidity={data.humidity}
        />
        <DayForecastCard
          day={new Date().toLocaleDateString("en-US", { weekday: "long" })}
          temp={data.temp}
          aqi={`${data.aqi * 50} AQI`}
        />
      </>
    )
  )}
</Main>
    </>
  );
}

// Convert AQI level to label
function getAQIStatus(aqiLevel) {
  switch (aqiLevel) {
    case 1:
      return "Good";
    case 2:
      return "Fair";
    case 3:
      return "Moderate";
    case 4:
      return "Poor";
    case 5:
      return "Very Poor";
    default:
      return "Unknown";
  }
}

export default SearchPage;
