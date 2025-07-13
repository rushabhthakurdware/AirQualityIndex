import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import { useNavigate } from "react-router-dom";
import { Oval } from 'react-loader-spinner';


function HistoryPage() {
    const [loading, setLoading] = useState(false);
  
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(()=>{
    const data = JSON.parse(localStorage.getItem("aqi-history")) || [];
    
    setHistory(data);
    setLoading(false)
    },500);
    
  }, []);
  const navigate = useNavigate();



  return (
    <> 
   

    <div className="bg-gray-1000">
      <button
  onClick={() => navigate("/")}
  className="mb-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
>
  ← Back to Search
</button>


  <button
  className="mt-4 bg-red-500 text-white px-4 py-2 rounded ml-250"
  onClick={() => {
    localStorage.removeItem("aqi-history");
    setHistory([]);
  }}
  >
      Clear History
  </button>


  <h1 className="text-2xl font-bold mb-4">Search History</h1>

  {loading ? (
      <div className="flex justify-center items-center h-32">
        <Oval
          height={50}
          width={50}
          color="#10b981"
          secondaryColor="#d1fae5"
          strokeWidth={4}
          ariaLabel="loading"
        />
      </div>):history.length === 0 ? (

        <p className="text-black-500">No search history yet.</p>
      ) : (
        <ul className="space-y-2 text-red-800 text-xl">

          {history.map((entry, idx) => (
            <li key={idx} className="bg-white p-3 rounded shadow text-gray-800 text-xl">
              <div className="font-semibold">{entry.city}</div>
              <div className="text-sm text-gray-500 text-black">{entry.time}</div>
            </li>

          ))}
        </ul>
      )}
      </div>
      
    </>
  );
}

export default HistoryPage;
