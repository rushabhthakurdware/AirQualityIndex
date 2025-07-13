import React from "react";

function SearchBox({ city, setCity, onSearch }) {
  return (
    <div className="p-4 flex gap-2 ">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border px-4 py-2 rounded w-full"
      />
      <button
        onClick={onSearch}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBox;
