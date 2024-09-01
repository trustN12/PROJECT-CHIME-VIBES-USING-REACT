import "./App.css";
import ChangeBG from "./Components/ChangeBG";
import Clock from "./Components/Clock";
import MusicPlayer from "./Components/MusicPlayer";
import QuoteGenerator from "./Components/QuoteGenerator";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      
      <h1 className={`flex justify-center text-7xl mb-3 ${darkMode ? "" : "text-white"}`}>
        Chime
        <div className="div">
        <span className="text-emerald-400">Vibes</span>
        <span className="absolute top-0 right-5">{ <ChangeBG /> }</span>
        </div>
      </h1>
      <Clock darkMode={darkMode} setDarkMode={setDarkMode} />
      <MusicPlayer />
      <QuoteGenerator />
     
    </>
  );
}

export default App;
