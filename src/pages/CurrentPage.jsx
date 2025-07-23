import React, { useEffect, useState } from "react";
import { getAirQualityData } from "../utils/api";
import AQICard from "../components/AQICard";
import InfoCard from "../components/InfoCard";
import DayForecastCard from "../components/DayForecastCard";
import Main from "../components/Main";
import { useNavigate } from "react-router-dom";
import myPhoto from  "../assets/myPhoto.jpg";
import { Oval } from 'react-loader-spinner';
import {PieChart,Pie,Cell,Tooltip,Legend,ResponsiveContainer,} from "recharts";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";





function CurrentPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const buttonref = useRef(null);

  const cardContainerRef = useRef(null);
const pieChartRef = useRef(null);


  useGSAP(() => {
  if (buttonref.current) {
    gsap.fromTo(
      buttonref.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
    );
  }

  if (cardContainerRef.current) {
    gsap.fromTo(
      cardContainerRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power2.out" }
    );
  }

  if (pieChartRef.current) {
    gsap.fromTo(
      pieChartRef.current,
      { x: 100, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, duration: 1, delay: 1, ease: "back.out(1.7)" }
    );
  }
}, { dependencies: [data] });



  const navigate = useNavigate();

  useEffect(() => {
    
    // Get user's coordinates
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {

          setLoading(true)
          const result = await getAirQualityData(lat, lon);
          setData(result);
                console.log("Fetched Data:");

        } catch (err) {
          setError("Unable to fetch air quality data.");
        }finally{
          setLoading(false)
        }
      },
      (err) => {
        setError("Location access denied or unavailable.");
      }
    );
  }, []);

  return (
    <div className="text-white relative">
  <div
  className="min-h-screen bg-cover bg-center bg-no-repeat text-white relative"
  style={{ backgroundImage: `url(${myPhoto})` }}
>

    <button
    ref={buttonref}
      onClick={() => navigate("/")}
      className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
    >
      ← Back to Search
    </button>

    <button
      onClick={() => navigate("/history")}
      className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 ml-270"
    >
       move to History →
    </button>
  

  <h1 className="text-2xl font-bold mb-2 mt-4 items-center justify-center text-center relative z-10">Your Current Air Quality</h1>
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
  ):data? (
  <>
    

    <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-center gap-4 mt-20 px-4">

      <div className="flex flex-col  w-full " ref={cardContainerRef}>

      <AQICard aqi={data.aqi * 50} status={getAQIStatus(data.aqi)} />
      <InfoCard temp={data.temp} wind={data.wind} humidity={data.humidity} />
      <DayForecastCard
        day={new Date().toLocaleDateString("en-US", { weekday: "long" })}
        temp={data.temp}
        aqi={`${data.aqi * 50} AQI`}
      />
      </div>
      {data?.components && (
  <div className="p-4 w-full lg:w-1/2 max-w-md mx-auto lg:mx-0"
      ref={pieChartRef}>

    <h2 className="text-xl font-bold text-center mb-2 text-green-500">Pollutant Breakdown</h2>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={[
            { name: "CO", value: data.components.co },
            { name: "NO₂", value: data.components.no2 },
            { name: "O₃", value: data.components.o3 },
            { name: "PM2.5", value: data.components.pm2_5 },
            { name: "PM10", value: data.components.pm10 },
          ]}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"].map(
            (color, index) => (
              <Cell key={`cell-${index}`} fill={color} />
            )
          )}
        </Pie>
        <Tooltip
             formatter={(value, name) => [`${value} µg/m³`, name]}
                  />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
)}
</div>

    </>
  ):null}
</div>
</div>
);
}

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

export default CurrentPage;
