import React from "react";
import { Thermometer, Wind, Droplet } from "lucide-react";

function InfoCard({ temp, wind, humidity }) {
  return (
    <div className="flex justify-around bg-gray-500 shadow p-4 rounded mb-4 text-center">
      <div>
        <Thermometer className="mx-auto" />
        <p>{temp} °C</p>
        <span className="text-xs text-gray-500">Temperature</span>
      </div>
      <div>
        <Wind className="mx-auto" />
        <p>{wind} km/h</p>
        <span className="text-xs text-gray-500">Wind</span>
      </div>
      <div>
        <Droplet className="mx-auto" />
        <p>{humidity}%</p>
        <span className="text-xs text-gray-500">Humidity</span>
      </div>
    </div>
  );
}

export default InfoCard;
