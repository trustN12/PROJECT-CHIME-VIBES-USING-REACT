import React, { useState } from 'react';

const SoundPlayer = () => {
  // Array of sound file paths
  const sounds = [
    '/assets/app button click sound.mp3',
    '/assets/Boba Raat (Cover) _ Nabarun @rupaktiary.mp3',
    '/assets/click-buttons-ui-menu-sounds-effects-button-13-205396.mp3',
    '/assets/Experience (Ludovico Einaudi).mp3',
    '/assets/Idea 22.mp3',
    '/assets/Interstellar.mp3',
    '/assets/mouse-click-117076.mp3',
    '/assets/ＳＡＤＷＡＶＥ ~ [FREE] SAD CHILL LOFI TYPE BEAT ( LO-FI RAP BEAT 2024).mp3',
    '/assets/Select Button Sound Effect.mp3',
    '/assets/ui-click-97915.mp3',
    '/assets/y2mate.com - Best Mtv  Coke Studio unplugged songs 1.mp3',
    '/assets/y2mate.com - fairytale.mp3',
    '/assets/y2mate.com - nostalgia.mp3',
    '/assets/y2mate.com - say something.mp3',
    '/assets/y2mate.com - snowfall.mp3',
    '/assets/y2meta.com - Jacob and the Stone (128 kbps).mp3',
    '/assets/zapsplat_multimedia_beep_high_tech_cyber_button_87509.mp3',
  ];

  // State to manage the currently selected sound
  const [currentSound, setCurrentSound] = useState(sounds[0]);

  return (
    <div>
      <h2>Play Sound</h2>
      <audio src={currentSound} controls />
      <div>
        {sounds.map((sound, index) => (
          <button key={index} onClick={() => setCurrentSound(sound)}>
            Play Sound {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SoundPlayer;
