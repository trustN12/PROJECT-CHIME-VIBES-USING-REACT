import React, { useEffect, useRef, useState } from "react";
import {
  CgPlayButton,
  CgPlayPause,
  CgPushChevronLeft,
  CgPushChevronRight,
} from "react-icons/cg"; // Corrected icon imports

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [currTrack, setCurrTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const Tracks = [
    {
      title: "Snowfall-Oneheart",
      source: "src/assets/y2mate.com - snowfall.mp3",
      image:
        "https://lh3.googleusercontent.com/2IYboQLztE7gb4-j8qNYM5H65M9X_u2vHuebHvXpWTw0ikELEnkrUZVjwa7HOYq8_CE-7MA8c-rd6CyZ=w544-h544-l90-rj",
    },
    {
      title: "Nostalgia-Oneheart",
      source: "src/assets/y2mate.com - nostalgia.mp3",
      image:
        "https://lh3.googleusercontent.com/FDKG95YfuqO-S97dX0kXFYbfeXo11mOctK5qlkHHKuwCCXIgFKycq7W63hfBGDkKarcksLQsgwVysNSm=w544-h544-l90-rj",
    },
    {
      title: "Say Something-Oneheart",
      source: "src/assets/y2mate.com - say something.mp3",
      image:
        "https://lh3.googleusercontent.com/qa26Od9M5GR4lXqlzQKv8Hlguwat1kkNAyX4fSYze7aZeZV8pViJIF9__roDNNLxGoMd77fc2cqmR_0=w544-h544-l90-rj",
    },
    {
      title: "Fairytale-Oneheart",
      source: "src/assets/y2mate.com - fairytale.mp3",
      image:
        "https://lh3.googleusercontent.com/Eiczg4egnTzIiYcTsiVoGmkS_fFb1Rv4-vu_KeRD4UdYcBN_FhNj4t_19aS7f5buesyQkSS-UGIAdTB5Rg=w544-h544-l90-rj",
    },
    {
      title: "Best Mtv & Coke Studio unplugged songs",
      source:
        "src/assets/y2mate.com - Best Mtv  Coke Studio unplugged songs 1.mp3",
      image:
        "https://i.pinimg.com/564x/30/72/5b/30725b7bb75afde26ba952ab73f02ae2.jpg",
    },
    {
      title: "Boba Raat - Nabarun",
      source: "src/assets/Boba Raat (Cover) _ Nabarun @rupaktiary.mp3",
      image:
        "https://i.pinimg.com/originals/88/f5/ad/88f5ad264e1f7e7641d07e8f577b3b15.jpg",
    },
    {
      title: "LoFi Beat Mix - Misery",
      source:
        "src/assets/ＳＡＤＷＡＶＥ ~ [FREE] SAD CHILL LOFI TYPE BEAT ( LO-FI RAP BEAT 2024).mp3",
      image:
        "https://i.pinimg.com/1200x/33/99/54/3399541de6d0545151e9bf2f6571aef1.jpg",
    },
  ];

  const handlePrev = () => {
    setCurrTrack((prev) => (prev > 0 ? prev - 1 : Tracks.length - 1));
    setPlay(true); // Pause on previous track
  };

  const handleNext = () => {
    setCurrTrack((prev) => (prev < Tracks.length - 1 ? prev + 1 : 0));
    setPlay(true); // Automatically play the next track
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

      // Autoplay when track changes
      if (play) {
        audioElement.play();
      } else {
        audioElement.pause();
      }

      return () => {
        if (audioElement) {
          audioElement.removeEventListener("timeupdate", handleTimeUpdate);
          audioElement.removeEventListener("loadedmetadata", handleTimeUpdate);
        }
      };
    }
  }, [currTrack]); // Depend on currTrack only

  useEffect(() => {
    if (play && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [play]);

  return (
    <div className="pt-16 sm: mt-7">
      <div className="relative text-center">
        <h1 className="text-4xl text-pink-100 font-abold">Play Music</h1>
        <h2 className="text-xl text-slate-950 mb-4 glow">
          {Tracks[currTrack].title}
        </h2>
        <div className="relative">
          <img
            src={Tracks[currTrack].image}
            className="w-80 mx-auto mt-5 rounded-xl shadow-2xl"
            style={{ boxShadow: "0 0 100px rgba(255, 0, 250, 1)" }}
            alt={Tracks[currTrack].title}
          />
          <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 w-full flex justify-center items-center space-x-2">
            <span className="text-white text-xs">
              {formatTime(currentTime)}
            </span>
            <span className="text-white text-xs">:</span>
            <span className="text-white text-xs">{formatTime(duration)}</span>
          </div>
          <div className="absolute bottom-32 left-0 right-0 flex justify-center space-x-4">
            <CgPushChevronLeft
              className="text-4xl text-white cursor-pointer "
              onClick={handlePrev}
            />
            {play ? (
              <CgPlayPause
                className="text-4xl text-white cursor-pointer "
                onClick={handlePause}
              />
            ) : (
              <CgPlayButton
                className="text-4xl text-white cursor-pointer"
                onClick={handlePlay}
              />
            )}
            <CgPushChevronRight
              className="text-4xl text-white cursor-pointer"
              onClick={handleNext}
            />
          </div>
        </div>
        <audio ref={audioRef} src={Tracks[currTrack].source} key={currTrack} />
      </div>
    </div>
  );
};

export default MusicPlayer;
