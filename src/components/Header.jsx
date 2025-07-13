import React, { useEffect, useState } from "react";
import { Search, Wind, Building2 } from "lucide-react";
import myPhoto from '../assets/myPhoto.jpg';
import { getCityCoordinates } from "../utils/api";
import { getCitySuggestions } from "../utils/api";

function Header({ city, setCity, onSearch, onCurrentLocation, onHistory }) {
  const[suggestion,setSuggestion]=useState([]);

  useEffect(()=>{
    const fetchSuggestions=async()=>{
      if (city.length < 2) {
        setSuggestion([]);
        return;
    }
    try{
       const results = await getCitySuggestions(city);
      setSuggestion(results)
    }catch(err){
      setSuggestion([])
    }
  }
  const timeOut=setTimeout(fetchSuggestions,300);
  return ()=>clearTimeout(timeOut);
  },[city]);

  const handleSuggestionClick = (name) => {
    setCity(name);
    setSuggestion([]);
  };

  return (
    <div className="relative text-white">
      <img
        src={myPhoto}
        alt="background"
        className="w-full h-70 object-cover "
      ></img>

      <div className="absolute inset-0 bg-black-600 bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-green-600">AIR QUALITY MONITOR</h1>
        <p className="italic mb-2 mt-2  font-semibold tetxt-xl text-green-600 ">Weather Forecast</p>
        <p className=" font-semibold text-l text-green-600">Get Air Quality of your current location or any other places you want to know about.</p>

        <div className="flex w-full mt-4">
          <input
            type="text"
            placeholder="Search Places here..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 rounded-l-full text-black border-2 border-gray-600 bg-white"
          />
          <button
            onClick={onSearch}
            className="bg-black p-2 rounded-r-full"
          >
            <Search className="text-white" />
          </button>

            {suggestion.length > 0 && (
            <ul className="absolute z-10 w-full bg-white text-black shadow-md mt-1 rounded">
              {suggestion.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(`${item.name}, ${item.country}`)}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {item.name}, {item.state ? item.state + ", " : ""}{item.country}
                </li>
              ))}
            </ul>
          )}
        </div>

       




        <div className="flex gap-4 mt-4">
          <button
            onClick={onCurrentLocation}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white bg-yellow-400 active:scale-95"
          >
            <Wind className="text-green-400" /> Current Air Quality
          </button>
          <button
            onClick={onHistory}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white bg-yellow-400 active:scale-95"
          >
            <Building2 className="text-green-400 " /> History
          </button>
        </div>
      </div>
      
    </div>
    
  );
}

export default Header;

