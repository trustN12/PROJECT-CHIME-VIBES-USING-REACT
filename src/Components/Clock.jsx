import React, { useState, useEffect } from "react";

const Clock = () => {
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
    boxShadow: "0 0 100px rgba(255, 255, 255, 1)",
  };

  return (
    <>
      <div
        className="justify-center mx-auto rounded-2xl w-72"
        style={glowStyle}
      >
        {/* Time Section */}
        <div className="text-white text-2xl">
          <span>{displayHours.toString().padStart(2, "0")}</span>:
          <span>{time.getMinutes().toString().padStart(2, "0")}</span>:
          <span>{time.getSeconds().toString().padStart(2, "0")}</span>{" "}
          <span>{amPm} </span>
        </div>
        {/* Date Section */}
        <div className="text-pink-100 ">
          {time.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </>
  );
};

export default Clock;
