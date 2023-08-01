import Movie from './Movie';
import api from '../../api/axiosConfig';
import { useState, useEffect } from 'react';

function Watchlist() {
const [watchMovie, setWatchMovies] = useState([]); // movies is an array of JS objects

  const getWatchMovies = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('userId'));
      const response = await api.post("/watchlist/get",{userId:userId});
      console.log(response.data);
      setWatchMovies([...response.data]);

    } catch (err) {
      
      console.log(err);
    }
  }

  const deleteMovie=async(imdbId)=>{
    try{
        const userId = JSON.parse(localStorage.getItem('userId'));
        await api.post("/watchlist/delete",{userId:userId,imdbId:imdbId});
        setWatchMovies(watchMovie.filter(movie=>movie.imdbId!==imdbId))
    }
    catch(err){
    console.error(err);
    }
}

  useEffect(() => {
    getWatchMovies();
  }, [])
  return (
    <>
      {watchMovie.map((movie) => (
        <Movie
          movie={movie}
          deleteMovie={deleteMovie}
        >
        </Movie>
      ))}
    </>
  );
}

export default Watchlist;