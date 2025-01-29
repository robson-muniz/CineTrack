import {useEffect, useState} from "react";
import {Navbar} from "./components/Navbar";
import {Search} from "./components/Search";
import {NumResults} from "./components/NumResults";
import {Main} from "./components/Main";
import {Box} from "./components/Box";
import {MovieList} from "./components/MovieList";
import {tempMovieData} from "./data/TempMovieData";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";

function App() {
   const [query, setQuery] = useState("");
   const [movies, setMovies] = useState(tempMovieData);
   const [watched, setWatched] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const [selectedId, setSelectedId] = useState(null);

   const KEY = 'a67d9238'

/*
  useEffect( function (){
    console.log('After initial render')
  }, [])

  useEffect( function (){
    console.log('After every render')
  })

  useEffect(function (){
    console.log('D')
  },[query])

  console.log('During render')

 */

  function handleSelectedMovie(id) {
    setSelectedId((prevId) => (prevId === id ? null : id));
  }

  function handleCloseMovie(){
    setSelectedId(null)
  }

  function handleWatched(movie){
    setWatched(watched => [...watched, movie])
  }



   useEffect(function ()  {
     const controller = new AbortController();

     async function getMovies () {
       try {setIsLoading(true);
         setError("")

       const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal: controller.signal})

       if (!res.ok) throw new Error('Something went wrong');
         const data = await res.json()
         if (data.Response === 'False') throw new Error('Movie not found');

           setMovies(data.Search);
           setError("")
       }
       catch (err){
         console.log(err)

         if (err.name !== 'AbortError') {
           setError(err.message)
         }

       } finally {
         setIsLoading(false);
       }
     }
     if (query.length < 3) {
       setMovies([]);
       setError('')
       return
     }
     getMovies()

     return function() {
       controller.abort();
     }

   }, [query])

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
                    <WatchedMovieList watched={watched} />
                  </>)

              }
            </Box>
         </Main>
      </>
   );
}

export default App;


