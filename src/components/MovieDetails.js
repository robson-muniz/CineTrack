import {useEffect, useState} from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

function MovieDetails({ selectedId, onCloseMovie, apiKey, onWatched, watched}) {
   const [movie, setMovie] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const [userRating, setUserRating] = useState('');

   const isWatched = watched.map(movie => movie.imdbID).includes(selectedId)

  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating



   const {Title: title, Year: year, Poster: poster, imdbID: imdbID, Released: released, Actors:actors, Director:director, Genre: genre, Runtime: runtime, imdbRating:imdbRating, Plot: plot} = movie

 function handleAdd(){
      const newMovie = {
         imdbID: imdbID,
         title: title,
         year: year,
         poster: poster,
         imdbRating: Number(imdbRating),
         runtime: Number(runtime.split(' ').at(0)),
        userRating,
      }
      onWatched(newMovie)
      onCloseMovie()
 }
   useEffect(function (){
      async function getMovieDetails() {
         setIsLoading(true)
         const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`)
         const data = await res.json()
         console.log(data)
         setMovie(data)
         setIsLoading(false)
      }
      getMovieDetails()
     console.log("Current user rating:", userRating);
   }, [selectedId])

   return (
     <div className="details">
        {isLoading ? <Loader /> :
        <>
           <header>
              <button className="btn-back" onClick={onCloseMovie}>
                 X
              </button>
              <img src={poster} alt={`Poster for ${movie}`}/>
              {/* Display the selected movie ID */}
              <div className="details-overview">
                 <h2>{title}</h2>
                 <p>{released} &bull; {runtime}</p>
                 <p>{genre}</p>
                 <p><span>🤩</span>{imdbRating} IMDb Rating</p>
              </div>
           </header>

           <section>
              <div className="rating">
                { !isWatched ?
                  <>
                  <StarRating onSetRating={(rating) => setUserRating(Number(rating))}/>
                {userRating && userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to Watchlist
                  </button>
                )}
                 </>: <p>You have already watched this movie and also gave it the rating: <span>🌟</span>{watchedUserRating}</p>}
              </div>
              <p><em>{plot}</em></p>
              <p>Staring {actors}</p>
              <p>Directed by {director}</p>
           </section>
        </>}
     </div>
   );
}

export default MovieDetails;