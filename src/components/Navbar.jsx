import tv from "../assets/tv.png"
import Menu from "../assets/Menu.png"
import search1 from "../assets/search1.png";
import { useState } from "react";
import PropTypes from 'prop-types';

const API_SEARCH = "https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=0ed706a9d9841118258f6c55acfaf4fe"

const Navbar = ({ setMovies }) => {
    const [query, setQuery] = useState("");

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
        <nav className="fixed top-0 left-0 w-full bg-transparent px-1 z-10">
            <div className="container sm:ml-20 px-0 py-5 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center mr-8">
                    <img src={tv} alt="Logo" className="h-8 w-8 mr-2" />
                    <h1 className="text-white text-lg font-semibold">Movie Box</h1>
                </div>

                {/* Search Bar */}
                <div className="relative flex-grow ml-4" >
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

                {/* Login Button */}
                <div className="px-4 py-2 ml-5 flex text-white flex-row transition duration-300">
                    <a className="px-3">Sign In</a>
                    <img src={Menu} alt="Logo" className="h-8 w-8 mr-2" />
                </div>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    setMovies: PropTypes.func.isRequired,
};

export default Navbar;