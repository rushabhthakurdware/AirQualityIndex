import React from "react";

function Main({ children }) {
  return (
    <main className="p-4 bg-gray-1000 min-h-screen">
      {children}
    </main>
  );
}

export default Main;
