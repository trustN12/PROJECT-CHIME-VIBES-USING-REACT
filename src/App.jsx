import "./App.css";
import ChangeBG from "./Components/ChangeBG";
import Clock from "./Components/Clock";
import MusicPlayer from "./Components/MusicPlayer";
import QuoteGenerator from "./Components/QuoteGenerator";
import { useState } from "react";
import SoundPlayer from "./Components/soundPlayer";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSoundPlayer, setShowSoundPlayer] = useState(false);

  return (
    <>
      {showSoundPlayer && <SoundPlayer />}
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
      <button onClick={() => setShowSoundPlayer(!showSoundPlayer)} style={{ display: 'none' }}>
        {showSoundPlayer ? "Hide Sound Player" : "Show Sound Player"}
      </button>
     
    </>
  );
}

export default App;
