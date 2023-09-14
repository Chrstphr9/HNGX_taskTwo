import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Featured from "./components/Features";
import MovieDetails from './components/movieDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const movieUrl = import.meta.env.VITE_MOVIEBOX_URL;

function App() {
  const [movies, setMovies] = useState([]);
  const [firstFiveMovies, setFirstFiveMovies] = useState([])

  useEffect(() => {
    fetch(movieUrl)
      .then((res) => res.json())
      .then(data => {
        console.log(data);
        setMovies(data.results.slice(0, 10))
      })
  }, [])

  useEffect(() => {
    fetch(movieUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFirstFiveMovies(data.results.slice(0, 5));
      })
  }, [])



  return (
    <Router>
    <Routes>
      <Route path="/" element={<Hero firstFiveMovies={firstFiveMovies} movies={movies} setFirstFiveMovies={setFirstFiveMovies} setMovies={setMovies} />} />
      <Route path="/featured" element={<Featured movies={movies} setMovies={setMovies} />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
    </Routes>
    
  </Router>

  )
}

export default App
