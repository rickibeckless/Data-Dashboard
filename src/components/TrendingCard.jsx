import React, { useState, useEffect } from 'react';
import axios from 'axios';

/*
    for implementing some filter functionalities, I want to:
    ( ) give users a way to filter the trending movies/tv shows by genre
    ( ) give users a way to filter the trending movies/tv shows by week or day
*/

const TrendingMovieCard = ({ setSearchResults, setCredits, setReviews }) => {

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

    const handleSearch = async (movieId, movieData) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`
            );
            const movieCredits = response.data;
            console.log("movieId:", movieId);
            console.log("movieCredits:", movieCredits);
            console.log("movieData:", movieData);
    
            const movieSearchQuery = await axios.get(
                `https://api.themoviedb.org/3/search/movie?query=${movieData.title}&include_adult=false&language=en-US&page=1&api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`
            );
            const slicedSearchResults = movieSearchQuery.data.results.slice(0, 1);
            setSearchResults(slicedSearchResults);
            setCredits(movieCredits);

        } catch (error) {
            console.error('Error fetching movie credits:', error);
        }
    };
    

    return (
        <div id="trending-card">
            <ul>
                {movies.map((movie, index) => (
                    <li key={movie.id}  className="trending-list">{index + 1}: 
                        <button onClick={() => handleSearch(movie.id, movie)} className="trending-title">
                            {movie.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const TrendingTVCard = ({ setSearchResults, setSearchType, setCredits }) => {

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

    const handleSearch = async (showId, showData) => {
        try {
            if (showData.media_type === 'tv') {
                setSearchType('tv');
            }
    
            const response = await axios.get(
                `https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`
            );
            const showCredits = response.data;
            console.log("showId:", showId);
            console.log("showCredits:", showCredits);
            console.log("showData:", showData);
    
            const showSearchQuery = await axios.get(
                `https://api.themoviedb.org/3/search/tv?query=${showData.name}&include_adult=false&language=en-US&page=1&api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`
            );
            const slicedSearchResults = showSearchQuery.data.results.slice(0, 1);
            setSearchResults(slicedSearchResults);
            setCredits(showCredits);
        } catch (error) {
            console.error('Error fetching show credits:', error);
        }
    };
    

    return (
        <div id="trending-card">
            <ul>
                {shows.map((show, index) => (
                    <li key={show.id}  className="trending-list">{index + 1}: 
                        <button onClick={() => handleSearch(show.id, show)} className="trending-title">
                            {show.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export { TrendingMovieCard, TrendingTVCard };
