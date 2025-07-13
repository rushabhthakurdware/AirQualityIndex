import React from "react";

function HourlyForecastCard({ time, temp, wind, humidity }) {
  return (
    <div className="flex justify-between bg-gray-500 p-3 rounded shadow mb-2">
      <p className="w-20">{time}</p>
      <p className="w-20">{temp} °C</p>
      <p className="w-20">{wind} km/h</p>
      <p className="w-20">{humidity}%</p>
    </div>
  );
}

export default HourlyForecastCard;
