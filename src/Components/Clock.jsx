import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Clock = ({ darkMode, setDarkMode }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const hours = time.getHours();
  const displayHours = hours % 12 || 12;
  const isPM = hours >= 12;
  const amPm = isPM ? "PM" : "AM";

  const glowStyle = {
    boxShadow: "0 0 80px rgba(200, 255, 195, 0.8)",
  };

  const playClickSound = () => {
    const audio = new Audio(
      "/assets/zapsplat_multimedia_beep_high_tech_cyber_button_87509.mp3"
    ); // Path to your click sound file
    audio.volume = 0.3;
    audio.play();
  };

  return (
    <div
      className={`transition-none justify-center px-4 mx-auto rounded-2xl w-72 duration-700 ${
        darkMode ? " text-white" : "bg-white bg-opacity-90 text-slate-900"
      }`}
      style={glowStyle}
    >
      <div className="flex justify-between items-center">
        <div>
          {/* Time Section */}
          <div className="text-2xl">
            <span>{displayHours.toString().padStart(2, "0")}</span>:
            <span>{time.getMinutes().toString().padStart(2, "0")}</span>:
            <span>{time.getSeconds().toString().padStart(2, "0")}</span>{" "}
            <span>{amPm} </span>
          </div>
          {/* Date Section */}
          <div className={`${darkMode ? "text-pink-100" : "text-slate-900"}`}>
            {time.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        {/* Toggle Dark Mode */}
        <button
          className={`p-2 rounded-full hover:bg-slate-100 hover:bg-opacity-20 ${
            darkMode ? "" : "hover:bg-yellow-900"
          }`}
          onClick={() => {
            playClickSound();
            setDarkMode((prevMode) => !prevMode);
          }}
        >
          {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
};

export default Clock;
