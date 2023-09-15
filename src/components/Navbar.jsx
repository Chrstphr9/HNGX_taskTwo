import tv from "../assets/tv.png"
import Menu from "../assets/Menu.png"
import search1 from "../assets/search1.png";
import { useState } from "react";
import PropTypes from 'prop-types';

const API_SEARCH = "https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=0ed706a9d9841118258f6c55acfaf4fe"

const Navbar = ({ setMovies }) => {
    const [query, setQuery] = useState("");
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu);
      };

    const searchMovie = async (e) => {
        e.preventDefault();
        console.log("searching");
        try {
            const url = `${API_SEARCH}&query=${query}`;
            const res = await fetch(url);
            const data = await res.json();
            console.log(data)
            setMovies(data.results);
        }
        catch (e) {
            console.log(e);
        }
    }

    const changeHandler = (e) => {
        setQuery(e.target.value);
    }

    return (
        <nav className="fixed top-0 left-0 w-full z-10">
            <div className="container xx:w-full sm:ml-10 px-0 py-5 flex flex-row justify-between items-center bg-opacity-50 backdrop-blur-md">
                <div className="flex items-center mr-8">
                    <img src={tv} alt="Logo" className="h-8 w-8 xx:ml-4 sm:mr-2" />
                    <h1 className="text-white text-lg font-semibold hidden sm:block">Movie Box</h1>
                </div>

                <div className="relative  xx:ml-0 sm:ml-2 sm:block  sm:w-[400px]" >
                    <form onSubmit={searchMovie}>
                        <input
                            type="text"
                            placeholder="What do you want to watch"      
                            name="query"
                            value={query}
                            onChange={changeHandler}
                            className="w-full px-3 py-1 rounded-md bg-transparent border text-white focus:outline-none focus:bg-transparent focus:ring-1 focus:ring-white pr-8 placeholder-white"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
                            <img src={search1} alt="Search Icon" className="h-5 w-5 bg-transparent" style={{ fill: 'white' }} />
                        </div>
                    </form>

                </div>

                <div className="sm:hidden flex items-center px-4 py-2 text-white">
          <button onClick={toggleMenu}>
            <img src={Menu} alt="Menu Icon" className="h-8 w-8" />
          </button>
          {showMenu && (
            <div className="absolute top-14 right-0 mt-2 bg-white text-black w-40 p-2 rounded-lg shadow-md">
              <a className="block py-1" href="#">Sign In</a>
            </div>
          )}
        </div>
        <div className="hidden sm:flex px-4 mr-8 w-[120px] py-2 text-white">
          <a className="px-3">Sign In</a>
        </div>
      </div>
    </nav>
    );
};

Navbar.propTypes = {
    setMovies: PropTypes.func.isRequired,
};

export default Navbar;