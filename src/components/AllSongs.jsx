import { useMusic } from "../hooks/useMusic";

export const AllSongs = () => {
  const { allSongs } = useMusic();
  return (
    <div className="all-songs">
      <h2>All Songs ({allSongs.length})</h2>
      <div className="songs-grid">
        {allSongs.map((song, key) => (
          <div key={key} className="song-card">
            <div className="song-info"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
