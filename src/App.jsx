import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import MovieDetails from './components/movieDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Hero firstFiveMovies={firstFiveMovies} movies={movies} setFirstFiveMovies={setFirstFiveMovies} setMovies={setMovies} />} />
      <Route path="/featured" element={<Features movies={movies} setMovies={setMovies} />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
    </Routes>
    
  </Router>
  )
}

export default App