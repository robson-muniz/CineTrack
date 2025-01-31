import {useEffect, useState} from "react";
import {Navbar} from "./components/Navbar";
import {Search} from "./components/Search";
import {NumResults} from "./components/NumResults";
import {Main} from "./components/Main";
import {Box} from "./components/Box";
import {MovieList} from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import {useMovie} from "./components/useMovies";

function App() {
   const [query, setQuery] = useState("");
   const [selectedId, setSelectedId] = useState(null);
   const {movies, isLoading,error} = useMovie(query);


  // Load watched movies from localStorage on initial render
   const [watched, setWatched] = useState(function (){
     const storedMovies = JSON.parse(localStorage.getItem("watched"));
     return storedMovies;
   });

   const KEY = 'a67d9238'


  function handleSelectedMovie(id) {
    setSelectedId((prevId) => (prevId === id ? null : id));
  }

  function handleCloseMovie(){
    setSelectedId(null)
  }

  function handleWatched(movie){
    setWatched(watched => [...watched, movie])

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]))
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched))
  }, [watched])

   return (
      <>
         <Navbar>
            <Search query={query} setQuery={setQuery} />
            <NumResults movies={movies} />
         </Navbar>
         <Main>
            <Box>
              {/*{isLoading ? <Loader /> :<MovieList movies={movies} />}*/}
              {isLoading && <Loader />}
              {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectedMovie} /> }
              {error && <ErrorMessage message={error} /> }
            </Box>
            <Box>
              {
                selectedId ? (
                  <MovieDetails
                    selectedId={selectedId}
                    onCloseMovie={handleCloseMovie}
                    onWatched={handleWatched}
                    watched={watched}
                    apiKey={KEY} // Pass KEY as a prop
                  />
                ) : (
                  <>
                    <WatchedSummary watched={watched} />
                    <WatchedMovieList watched={watched} onDeleteWatched={handleDeleteWatched} />
                  </>)

              }
            </Box>
         </Main>
      </>
   );
}

export default App;


