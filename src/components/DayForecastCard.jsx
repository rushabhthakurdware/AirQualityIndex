import React from "react";

function DayForecastCard({ day, temp, aqi }) {
  return (
    <div className="flex justify-between items-center p-8 bg-gray-500 shadow rounded mb-2">
      <p>{day}</p>
      <p>{temp} °C</p>
      <div className="bg-yellow-300 text-sm px-2 py-1 rounded">{aqi}</div>
    </div>
  );
}

export default DayForecastCard;
