import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FaPalette } from "react-icons/fa";

const ChangeBG = () => {
  const [videoSrc, setVideoSrc] = useState(
    "https://cdn.pixabay.com/video/2022/04/14/113882-699653944_large.mp4"
  );
  const videoElementRef = useRef(null);
  const [message, setMessage] = useState("");

  const glowStyle = {
    boxShadow: "0 0 80px rgba(200, 255, 195, 0.8)",
  };

  const playbackSound = () => {
    const audio = new Audio(
      "/assets/mouse-click-117076.mp3"
    ); // Path to your click sound file
    audio.volume = 0.8;
    audio.play();
  }

  const changeVideo = () => {
    // Generate a unique query string to force reload
    const randomParam = `?t=${new Date().getTime()}`;
    const newVideoSrc =
      videoSrc ===
      "https://cdn.pixabay.com/video/2022/04/14/113882-699653944_large.mp4"
        ? `https://cdn.pixabay.com/video/2023/11/09/188530-883127083_large.mp4${randomParam}`
        : "https://cdn.pixabay.com/video/2022/04/14/113882-699653944_large.mp4"; // Default video

    setVideoSrc(newVideoSrc);
    playbackSound();

    setMessage("Background Changed!"); // Show message
    setTimeout(() => setMessage(""), 2000);
  };

  useEffect(() => {
    if (videoElementRef.current) {
      videoElementRef.current.src = videoSrc;
      videoElementRef.current.load(); // Reload the video to apply the new source
    }
  }, [videoSrc]);

  return (
    <div className="relative">
      {message && (
        <div
          className="fixed top-14 right-5 bg-slate-200 text-slate-950 text-sm p-2 px-4 rounded shadow-lg bg-opacity-80 border-ra "
          style={glowStyle}
        >
          {message}
        </div>
      )}
      <button onClick={changeVideo}>
        <span>
          {
            <FaPalette className="fixed top-4 right-2 w-7 h-7 flex items-center justify-center shadow-2xl text-white hover:text-pink-300 transition-colors glow " />
          }
        </span>
      </button>

      <video ref={videoElementRef} autoPlay muted loop id="video-bg">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default ChangeBG;
