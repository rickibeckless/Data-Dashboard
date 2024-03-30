import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrendingMovieCard = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}&page=1`
                );
                const slicedMovies = response.data.results.slice(0, 10);
                setMovies(slicedMovies);
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            }
        };
    
        fetchTrendingMovies();
    }, []);

    const handleSearch = (movieId) => {
        console.log("movieId:", movieId);
    };

    return (
        <div id="trending-card">
            <ul>
                {movies.map((movie, index) => (
                    <li key={movie.id}  className="trending-list">{index + 1}: 
                        <button onClick={() => handleSearch(movie.id)} className="trending-title">
                            {movie.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const TrendingTVCard = () => {

    const [shows, setShows] = useState([]);

    useEffect(() => {
        const fetchTrendingShows = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/trending/tv/week?api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}&page=1`
                );
                const slicedShows = response.data.results.slice(0, 10);
                setShows(slicedShows);
            } catch (error) {
                console.error('Error fetching trending shows:', error);
            }
        };
    
        fetchTrendingShows();
    }, []);

    const handleSearch = (showId) => {
        console.log("showId:", showId);
    };
  
    return (
        <div id="trending-card">
            <ul>
                {shows.map((show, index) => (
                    <li key={show.id}  className="trending-list">{index + 1}: 
                        <button onClick={() => handleSearch(show.id)} className="trending-title">
                            {show.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { TrendingMovieCard, TrendingTVCard };
