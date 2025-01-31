import {useEffect, useState} from "react";
import {tempMovieData} from "../data/TempMovieData";

const KEY = 'a67d9238'

export function useMovie(query) {
  const [movies, setMovies] = useState(tempMovieData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(function ()  {
    // callback?.()

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

  return{movies,isLoading,error}
}