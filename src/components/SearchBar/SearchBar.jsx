import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import "./searchbar.css";
import "./result.css";
import { AiFillStar } from "react-icons/ai"
import Favoris from '../Favoris/Favoris';

const SearchBar = () => {

    const [moviesData, setMoviesData] = useState([]);
    const [movieSearchValue, setMovieSearchValue] = useState("");
    const [movieSelect, setMovieSelect] = useState("a");

    const [listData, setListData] = useState([]);

    useEffect(() => {
        let movieArray = [];

        let moviesId = window.localStorage.movies ? window.localStorage.movies.split(",") : [];

        for (let i = 0; i < moviesId.length; i++) {
            axios
                .get(`https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR`)
                .then((res) => movieArray.push(res.data))
                .then(() => setListData(movieArray))
        }
    }, [])

    const searchMovie = (e) => {
        e.preventDefault();
        console.log(e);
        setMovieSelect(movieSearchValue);
        if (movieSearchValue.length < 1) {
            setMovieSelect("a");
        }
    }

    const addStorage = (movieId) => {
        let storedData = window.localStorage.movies ? window.localStorage.movies.split(",") : [];

        if (!storedData.includes(movieId.toString())) {
            storedData.push(movieId);
            window.localStorage.movies = storedData;

            axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR`)
                .then((res) => setListData([...listData, res.data]))
        }
    }

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${movieSelect}&language=fr-FR`)
            .then((res) => setMoviesData(res.data.results));
    }, [movieSelect]);

    return (
        <>
            <Favoris listData={listData} />
            <div className='text-center container-search'>
                <form>
                    <div className='container-searchbar'>
                        <input type="text" name="search" id="search" placeholder="Recherche d'un film.." onChange={(e) => setMovieSearchValue(e.target.value)} />
                        <button onClick={searchMovie} type='submit'>Rechercher</button>
                    </div>
                    <div className="container-search-favoris">
                        <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" onClick={(e) => e.preventDefault()}><AiFillStar size="20" className="me-2" />Favoris</button>
                    </div>
                </form>
            </div>
            <div className='container-result'>
                {moviesData.map((movie) => {
                    return (
                        <div className="card container-result-item" key={movie.id}>
                            <div className='effect-hover-img-txt'>
                                <em>{movie.overview}</em>
                                <img className="card-img-top" src={movie.poster_path ? "https://image.tmdb.org/t/p/original" + movie.poster_path : "./assets/img/poster.png"} alt={movie.title} />
                            </div>
                            <div className="card-body item">
                                <h5 className="card-title text-center text-light">{movie.title}</h5>
                                <div className="result-item-favori">
                                    <span>Ajouter aux favoris</span>
                                    <button className="rounded btn-item-hover" onClick={() => addStorage(movie.id)}><AiFillStar size="20" className="d-flex m-1" /></button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default SearchBar;


// https://api.themoviedb.org/3/movie/943533?api_key=ed82f4c18f2964e75117c2dc65e2161d