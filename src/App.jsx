// w._j5j24dRVNzsN
import React from "react";
import { BrowserRouter,Route,Router,Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import CurrentPage from "./pages/CurrentPage";
import HistoryPage from "./pages/HistoryPage";
function App() {
  return(
    <>
    
          <BrowserRouter>

               <Routes>
                  <Route path="/" element={<SearchPage />}/>  
                  <Route path="/current" element={<CurrentPage />}/>
                    <Route path="/history" element={<HistoryPage />}/>

              </Routes>

          </BrowserRouter>
       

    </>
  ) 
  }

export default App;