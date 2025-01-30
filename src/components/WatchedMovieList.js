import WatchedMovie from "./WatchedMovie";

function WatchedMovieList({watched, onDeleteWatched}) {
   return (
      <ul className="list">
         {watched.map((movie) => (
            <WatchedMovie movie={movie} key={movie.imdbID} onDelete={onDeleteWatched} />
         ))}
      </ul>
   );
}

export default WatchedMovieList