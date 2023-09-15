import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import MovieDetails from './components/movieDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Featured from "./components/Features";


const API_URL = "https://api.themoviedb.org/3/movie/top_rated?api_key=0ed706a9d9841118258f6c55acfaf4fe";

function App() {
  const [movies, setMovies] = useState([]);
  const [firstFiveMovies, setFirstFiveMovies] = useState([])

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results.slice(0, 10))
      })
  }, [])

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFirstFiveMovies(data.results.slice(0, 5));
      })
  }, [])



  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Hero firstFiveMovies={firstFiveMovies} movies={movies} setFirstFiveMovies={setFirstFiveMovies} setMovies={setMovies} />} />
        <Route path="/featured" element={<Featured movies={movies} setMovies={setMovies} />} />
     
        <Route path="/movies/:id" element={<MovieDetails firstFiveMovies={firstFiveMovies} />} />
      </Routes>
    </Router>
    </>

  )
}

export default App
