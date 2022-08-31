import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import "./searchbar.css";
import "./result.css";

const SearchBar = () => {

    const [moviesData, setMoviesData] = useState([]);
    
    // const searchMovie = (e) => {
    //  console.log(e.target.value);
    // }

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=avengers&language=fr-FR`)
            .then((res) => setMoviesData(res.data.results));
    }, []);

    return (
        <>
            <div className='text-center container-search'>
                <form>
                    <input type="text" name="search" id="search" placeholder="Recherche d'un film.."  />
                    <button type='submit'>Rechercher</button>
                </form>
            </div>
            <div className='container-result'>
                {moviesData.map((movie) => {
                    return (
                        <div className="card container-result-item" key={movie.id}>
                            <img className="card-img-top" src={movie.poster_path ? "https://image.tmdb.org/t/p/original" + movie.poster_path : "./img/poster.png"} alt={movie.title} />
                            <div className="card-body item">
                                <h5 className="card-title">{movie.title}</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default SearchBar;
