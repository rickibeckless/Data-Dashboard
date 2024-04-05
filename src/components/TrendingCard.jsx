import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrendingMovieCard = ({ setSearchResults, setCredits, reviews, setReviews }) => {

    const [movies, setMovies] = useState([]);
    const [trendingTime, setTrendingTime] = useState('week');

    useEffect(() => {
        fetchTrendingMovies();
    }, [trendingTime]);

    const fetchTrendingMovies = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/trending/movie/${trendingTime}?api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}&page=1`
            );
            const slicedMovies = response.data.results.slice(0, 10);
            setMovies(slicedMovies);
            setTrendingTime(trendingTime);
        } catch (error) {
            console.error('Error fetching trending movies:', error);
        }
    };

    const handleTrendingTimeChange = (event) => {
        setTrendingTime(event.target.value);
    };

    const handleSearch = async (movieId, movieData) => {
        try {
            const reviewResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`
            )
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`
            );
            const movieCredits = response.data;
            const movieReviews = reviewResponse.data;
    
            const movieSearchQuery = await axios.get(
                `https://api.themoviedb.org/3/search/movie?query=${movieData.title}&include_adult=false&language=en-US&page=1&api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`
            );
            const slicedSearchResults = movieSearchQuery.data.results.slice(0, 1);

            setSearchResults(slicedSearchResults);
            setCredits(movieCredits);
            setSearchResults([movieData]);
        } catch (error) {
            console.error('Error fetching movie credits:', error);
        }
    };
    

    return (
        <div id="trending-card">
            <select id="trending-movie-time" value={trendingTime} onChange={handleTrendingTimeChange}>
                <option value="week">Week</option>
                <option value="day">Day</option>
            </select>
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
    const [trendingTime, setTrendingTime] = useState('week');

    useEffect(() => {
        fetchTrendingShows();
    }, [trendingTime]);

    const fetchTrendingShows = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/trending/tv/${trendingTime}?api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}&page=1`
            );
            const slicedShows = response.data.results.slice(0, 10);
            setShows(slicedShows);
            setTrendingTime(trendingTime);
        } catch (error) {
            console.error('Error fetching trending shows:', error);
        }
    };    

    const handleTrendingTimeChange = (event) => {
        setTrendingTime(event.target.value);
    };

    const handleSearch = async (showId, showData) => {
        try {
            if (showData.media_type === 'tv') {
                setSearchType('tv');
            }
            const reviewResponse = await axios.get(
                `https://api.themoviedb.org/3/tv/${showId}/reviews?api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`
            )
            const response = await axios.get(
                `https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`
            );
            const showCredits = response.data;
            const showReviews = reviewResponse.data;
    
            const showSearchQuery = await axios.get(
                `https://api.themoviedb.org/3/search/tv?query=${showData.name}&include_adult=false&language=en-US&page=1&api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`
            );
            const slicedSearchResults = showSearchQuery.data.results.slice(0, 1);

            setSearchResults(slicedSearchResults);
            setCredits(showCredits);
            setSearchResults([showData]);
        } catch (error) {
            console.error('Error fetching show credits:', error);
        }
    };
    

    return (
        <div id="trending-card">
            <select id="trending-tv-time" value={trendingTime} onChange={handleTrendingTimeChange}>
                <option value="week">Week</option>
                <option value="day">Day</option>
            </select>            
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
