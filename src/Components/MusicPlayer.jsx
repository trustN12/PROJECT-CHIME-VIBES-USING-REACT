import React, { useEffect, useRef, useState } from "react";
import {
  CgPlayButton,
  CgPlayPause,
  CgPushChevronLeft,
  CgPushChevronRight,
} from "react-icons/cg"; // Corrected icon imports

import { FaVolumeMute, FaPlus, FaMinus, FaRedo } from "react-icons/fa";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [currTrack, setCurrTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(false);

  const playClickSound = () => {
    const audio = new Audio("/assets/ui-click-97915.mp3"); // Path to your click sound file
    audio.volume = 1;
    audio.play();
  };

  const playClickSound2 = () => {
    const audio = new Audio(
      "/assets/click-buttons-ui-menu-sounds-effects-button-13-205396.mp3"
    ); // Path to your click sound file
    audio.volume = 0.5;
    audio.play();
  };

  const Tracks = [
    {
      title: "Snowfall-Oneheart",
      source: "/assets/y2mate.com - snowfall.mp3",
      image:
        "https://lh3.googleusercontent.com/2IYboQLztE7gb4-j8qNYM5H65M9X_u2vHuebHvXpWTw0ikELEnkrUZVjwa7HOYq8_CE-7MA8c-rd6CyZ=w544-h544-l90-rj",
    },
    {
      title: "Nostalgia-Oneheart",
      source: "/assets/y2mate.com - nostalgia.mp3",
      image:
        "https://lh3.googleusercontent.com/FDKG95YfuqO-S97dX0kXFYbfeXo11mOctK5qlkHHKuwCCXIgFKycq7W63hfBGDkKarcksLQsgwVysNSm=w544-h544-l90-rj",
    },
    {
      title: "Say Something-Oneheart",
      source: "/assets/y2mate.com - say something.mp3",
      image:
        "https://lh3.googleusercontent.com/qa26Od9M5GR4lXqlzQKv8Hlguwat1kkNAyX4fSYze7aZeZV8pViJIF9__roDNNLxGoMd77fc2cqmR_0=w544-h544-l90-rj",
    },
    {
      title: "Fairytale-Oneheart",
      source: "/assets/y2mate.com - fairytale.mp3",
      image:
        "https://lh3.googleusercontent.com/Eiczg4egnTzIiYcTsiVoGmkS_fFb1Rv4-vu_KeRD4UdYcBN_FhNj4t_19aS7f5buesyQkSS-UGIAdTB5Rg=w544-h544-l90-rj",
    },
    {
      title: "Best Mtv & Coke Studio unplugged songs",
      source:
        "/assets/y2mate.com - Best Mtv  Coke Studio unplugged songs 1.mp3",
      image:
        "https://i.pinimg.com/564x/30/72/5b/30725b7bb75afde26ba952ab73f02ae2.jpg",
    },
    {
      title: "Boba Raat - Nabarun",
      source: "/assets/Boba Raat (Cover) _ Nabarun @rupaktiary.mp3",
      image:
        "https://i.pinimg.com/originals/88/f5/ad/88f5ad264e1f7e7641d07e8f577b3b15.jpg",
    },
    {
      title: "LoFi Beat Mix - Misery",
      source:
        "/assets/ＳＡＤＷＡＶＥ ~ [FREE] SAD CHILL LOFI TYPE BEAT ( LO-FI RAP BEAT 2024).mp3",
      image:
        "https://i.pinimg.com/1200x/33/99/54/3399541de6d0545151e9bf2f6571aef1.jpg",
    },
    {
      title: "Jacob and the stone",
      source: "/assets/y2meta.com - Jacob and the Stone (128 kbps).mp3",
      image:
        "https://lh3.googleusercontent.com/dZeO3G4a4ZrSFwM6nbY044WumfD1Ah3eSRdxMjS1yq6gCzVIlSwkp4giCtIwqMZHNrgt7nFJoVnFLys=w544-h544-l90-rj",
    },
    {
      title: "Idea 22 - Gibran Alcocer",
      source: "/assets/Idea 22.mp3",
      image:
        "https://lh3.googleusercontent.com/ZaG7LySj-ooWQU9yxuQAUh9OGgDL7faIi0RnmRWQU4uW2liG7Yf_D-vRlEboyoYSwqi02yQDwaBo1RMs=w544-h544-l90-rj",
    },
    {
      title: "Interstellar - Jerrik Dizlop",
      source: "/assets/Interstellar.mp3",
      image:
        "https://lh3.googleusercontent.com/cz-v5I1AlQ3DWo2vjSbJg7u-5vn3yXPq_xnCaTyOMLCxNhvJT1FPTl81C5g23pdlLT7u6aXuT5lBtkpc=w544-h544-l90-rj",
    },
    {
      title: "Experience - Ludovico Einaudi",
      source: "/assets/Experience (Ludovico Einaudi).mp3",
      image:
        "https://lh3.googleusercontent.com/BDn3Gx-gohcfCZ-QsTOkIq8Kt0jRfV_l9TbT4rqR5T_-wc1HKBozDE9FzdMHXdus218F606H3pBgqVpWJA=w544-h544-l90-rj",
    },
  ];

  const volumeSteps = [0, 0.2, 0.4, 0.6, 0.8, 1];

  const handlePrev = () => {
    playClickSound2();
    setCurrTrack((prev) => (prev > 0 ? prev - 1 : Tracks.length - 1));
    setPlay(true); // Pause on previous track
  };

  const handleNext = () => {
    if (loop) {
      // If loop is enabled, restart the current track
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      // Otherwise, move to the next track
      setCurrTrack((prev) => (prev < Tracks.length - 1 ? prev + 1 : 0));
      setPlay(true); // Automatically play the next track
    }

    playClickSound2();
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlay(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlay(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    audioRef.current.volume = muted ? 0 : newVolume;
  };

  const handleVolumeUp = () => {
    setVolume((prevVolume) => Math.min(prevVolume + 0.1, 1)); // Increase volume but cap at 1
    playClickSound();
  };

  const handleVolumeDown = () => {
    setVolume((prevVolume) => Math.max(prevVolume - 0.1, 0)); // Decrease volume but cap at 0
    playClickSound();
  };

  const handleMute = () => {
    setMuted((prevMuted) => !prevMuted);
  };

  const handleLoopToggle = () => {
    playClickSound();
    setLoop((prevLoop) => !prevLoop); // Toggle loop feature
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("loadedmetadata", handleTimeUpdate); // Set duration when metadata is loaded
      audioElement.addEventListener("ended", handleNext); // Autoplay next track when current track ends

      // Autoplay when track changes
      if (play) {
        audioElement.play();
      } else {
        audioElement.pause();
      }

      // Update volume
      audioElement.volume = muted ? 0 : volume;

      return () => {
        if (audioElement) {
          audioElement.removeEventListener("timeupdate", handleTimeUpdate);
          audioElement.removeEventListener("loadedmetadata", handleTimeUpdate);
          audioElement.removeEventListener("ended", handleNext); // Clean up event listener
        }
      };
    }
  }, [currTrack, play, volume, muted]);

  useEffect(() => {
    if (play && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [currTrack, play]);

  return (
    <div className="pt-7 sm: m-2">
      <div className="relative text-center">
        <h1 className="text-5xl text-pink-100 font-medium">Play Music</h1>
        <h2 className="text-xl mt-2 text-slate-950 mb-4 glow">
          {Tracks[currTrack].title}
        </h2>
        <div className="relative">
          <img
            src={Tracks[currTrack].image}
            className="w-96 mx-auto mt-7 rounded-xl shadow-2xl"
            style={{ boxShadow: "0 0 100px rgba(255, 0, 250, 1)" }}
            alt={Tracks[currTrack].title}
          />
          <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 w-full flex justify-center items-center space-x-2">
            <span className="text-white text-xl">
              {formatTime(currentTime)}
            </span>
            <span className="text-white text-xl">|</span>
            <span className="text-white text-xl">{formatTime(duration)}</span>
          </div>
          <div className="absolute bottom-40 left-0 right-0 flex justify-center space-x-4">
            <CgPushChevronLeft
              className="text-5xl text-white cursor-pointer   hover:text-blue-400 "
              onClick={handlePrev}
            />
            {play ? (
              <CgPlayPause
                className="text-5xl text-white cursor-pointer  hover:text-orange-400"
                onClick={handlePause}
              />
            ) : (
              <CgPlayButton
                className="text-5xl text-white cursor-pointer  hover:text-blue-400"
                onClick={handlePlay}
              />
            )}
            <CgPushChevronRight
              className="text-5xl text-white cursor-pointer  hover:text-blue-400"
              onClick={handleNext}
            />
          </div>

          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 justify-self-center">
            <FaVolumeMute
              className={`text-lg cursor-pointer ${
                muted ? "text-red-500" : "text-white"
              } `}
              onClick={handleMute}
            />

            <div className="flex flex-row items-center">
              {volumeSteps.map((step, index) => (
                <button
                  key={step}
                  className={`w-3 h-1 ${
                    volume >= step
                      ? "bg-blue-500"
                      : volume === 0
                      ? "bg-gray-500"
                      : "bg-gray-300"
                  } mb-1 border-none rounded`}
                  onClick={() =>
                    handleVolumeChange({ target: { value: step } })
                  }
                />
              ))}
            </div>

            {!muted && (
              <>
                <FaMinus
                  className="text-lg text-white cursor-pointer hover:text-pink-200"
                  onClick={handleVolumeDown}
                />
                <FaPlus
                  className="text-lg text-white cursor-pointer hover:text-pink-200"
                  onClick={handleVolumeUp}
                />
              </>
            )}

            <FaRedo
              className={`text-lg cursor-pointer ${
                loop ? "text-green-500" : "text-white"
              }`}
              onClick={handleLoopToggle}
            />
          </div>
        </div>
        <audio ref={audioRef} src={Tracks[currTrack].source} key={currTrack} />
      </div>
    </div>
  );
};

export default MusicPlayer;
