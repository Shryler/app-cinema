import React from 'react';
import "./favoris.css";

const Favoris = ({ listData }) => {

    return (
        <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Mes favoris</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className='result-favoris'>
                    {listData.length > 0 ? (
                        listData.map((movie) =>
                            <div key={movie.id}>
                                <div className="result-favoris-item">
                                    <h2>{movie.title}</h2>
                                    <img src={movie.poster_path ? "https://image.tmdb.org/t/p/original" + movie.poster_path : "./assets/img/poster.png"} alt={movie.title} />
                                </div>
                                <hr />
                            </div>
                        )
                    ) : (
                        <p>Vous n'avez pas de favoris</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Favoris;