import { createContext, useContext, useState } from "react";

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

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [allSongs, setAllSongs] = useState(songs);
  const [currentTrack, setCurrentTrack] = useState(songs[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  const handlePlaySong = (song, index) => {
    setCurrentTrack(song);
    setCurrentTrackIndex(index);
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = (prev + 1) % allSongs.length;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };
  const prevTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      songs: [],
    };

    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return { ...prev, songs: [...playlist.songs, song] };
        } else {
          return playlist;
        }
      }),
    );
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <MusicContext.Provider
      value={{
        allSongs,
        handlePlaySong,
        currentTrack,
        setCurrentTrack,
        currentTrackIndex,
        currentTime,
        setCurrentTime,
        formatTime,
        duration,
        setDuration,
        nextTrack,
        prevTrack,
        play,
        pause,
        isPlaying,
        volume,
        setVolume,
        playlists,
        createPlaylist,
        addSongToPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const contextValue = useContext(MusicContext);
  if (!contextValue) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return contextValue;
};
