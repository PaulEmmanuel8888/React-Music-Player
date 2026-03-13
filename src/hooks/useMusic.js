import { useState } from "react";

const songs = [
  {
    id: 1,
    title: "Tension",
    artist: "1000 Handz",
    url: "/songs/1000 Handz - Tension.mp3",
    duration: "2:48",
  },
  {
    id: 2,
    title: "Candy Bubbles",
    artist: "Puma Tunes",
    url: "/songs/Puma Tunes - Candy Bubbles (Kawaii Future Bass).mp3",
    duration: "2:05",
  },
  {
    id: 3,
    title: "Synthwave Moon Light",
    artist: "Sound of Freedom",
    url: "/songs/Sound Of Freedom - Synthwave Moon Light.mp3.mp3",
    duration: "3:11",
  },
];

export const useMusic = () => {
  const [allSongs, setAllSongs] = useState(songs);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const handlePlaySong = (song, index) => {
    setCurrentTrack(song);
    setCurrentTrackIndex(index);
  };

  return { allSongs, handlePlaySong, currentTrack, currentTrackIndex };
};
