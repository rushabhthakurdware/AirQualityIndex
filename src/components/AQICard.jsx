import React from "react";
// text-3xl font-bold mb-2 text-emerald-400 ${textColor}

function AQICard({ aqi, status }) {
  let bg = "bg-yellow-400";
  let textColor = "text-yellow-400"; // default

  if (aqi <= 50) {
    bg = "bg-green-400";
    textColor = "text-green-400";
  } else if (aqi >= 100 && aqi<150) {
    bg = "bg-yellow-400";
    textColor = "text-yellow-400";
  }else if(aqi >= 150 && aqi<200){
    bg = "bg-orange-500";
    textColor = "text-orange-500";
  }
  else{
    bg = "bg-red-400";
    textColor = "text-red-400";
  }

  return (
    <div className="p-4 mb-4 rounded shadow bg-gray-500">
      <div className="flex justify-between bg-gray-500">
        <div>
          <p className={`text-sm font-semibold bg-gray-700 rounded px-6 py-3 shadow-xl`}>Air Quality</p>
          <h2 className={ ` text-3xl font-bold mb-2 ml-2 shadow-xl active:scale-95 ${textColor}`}  >  {status}</h2>
        </div>
        <div className={`${bg} text-white font-bold px-9 py-7 rounded-full active:scale-95 shadow-xl shadow-inner `}>
          {aqi}
        </div>
      </div>
    </div>
  );
}

export default AQICard;
