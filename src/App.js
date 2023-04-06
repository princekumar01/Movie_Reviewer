 import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Navigation from './components/navigation/Navigation';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';

function App() {

  const [movies, setMovies] = useState([]); // movies is an array of JS objects
  const [movie, setMovie] = useState(null); // movie is a JS object
  const [reviewIds, setReviewIds] = useState([]); // reviews is an array of JS objects

  const getMovies = async () => {
    try {

      const response = await api.get("/api/v1/movies");

      // console.log("Response: ", response);
      // console.log("Response.data: ", arr);

      setMovies([...response.data]);

      // console.log("Movies: ", movies);

    } catch (err) {

      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
    try {

      const response = await api.get(`/api/v1/movies/${movieId}`);

      const singleMovie = response.data;

      // console.log(singleMovie);

      setMovie(singleMovie);

      setReviewIds([...singleMovie.reviewIds]);

      // console.log("Reviews: ", reviewIds);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies_collection={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviewIds={reviewIds} setReviewIds={setReviewIds} />} ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
