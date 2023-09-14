import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'; 
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import imdb from "../assets/imdb.png"
import Navbar from './Navbar';
import Featured from './Features';
import Footer from '../components/Footer';


const API_IMG = "https://image.tmdb.org/t/p/w500/";
const CAROUSEL_DELAY = 3000;


const Hero = ({ firstFiveMovies, setMovies, movies }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % firstFiveMovies.length);
      }, CAROUSEL_DELAY)
    
      return () => {
        clearInterval(intervalId)
      }
    }, [firstFiveMovies])
    



  return (
    <div>
      <Navbar setMovies={setMovies}/>
      <div className="relative w-full h-96">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          interval={CAROUSEL_DELAY}
          emulateTouch={true}
          swipeable={false}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          showArrows={true}
          selectedItem={currentSlide}
          onChange={(index) => setCurrentSlide(index)}
        >
          {firstFiveMovies.map((movieReq) => (
            <div key={movieReq.id} className="w-full h-96">
              <img src={API_IMG + movieReq.poster_path} alt={movieReq.title} className='bg-contain object-center'/>
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-left px-20">
                <div className="text-white text-left w-[400px] pt-16">
                  <h1 className="text-2xl font-semibold py-2">{movieReq.title}</h1>
                  <div className='flex flex-row'>
                    <div className='flex flex-row py-2'>
                      <img src={imdb} alt='img'/>
                      <h6 className='px-6'>{movieReq.vote_average}</h6>
                    </div>
                  </div>
                  <p className="text-sm py-2">{movieReq.overview}</p>
                  <button className='bg-red-700 p-1 rounded-md px-3 text-white'>
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <Featured movies={movies} setMovies={setMovies} />

      <Footer />
    </div>

  );
};

Hero.propTypes = {
    firstFiveMovies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        poster_path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        overview: PropTypes.string.isRequired,
      })
    ).isRequired,

    movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        poster_path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        overview: PropTypes.string.isRequired,
      })
    ).isRequired,
  
    setMovies: PropTypes.func.isRequired,
  };

export default Hero