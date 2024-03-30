import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingMovieCard, TrendingTVCard } from "./TrendingCard";

const NavBar = ({ setSearchResults }) => {

    /*
        when the user clicks the search button, the app should:
        (X) use the input value to search for a movie or tv show
        (X) display the title card for the movie or tv show
        (X) display the movie description in the movie description section
        ( ) display the movie poster in the movie poster section
        ( ) display the release date in the release date section
        ( ) display the ratings in the ratings section
        ( ) display the cast in the cast section
        ( ) display the crew in the crew section

        it would do this by:
        (X) using: `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1&api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`
        (X) using: `https://api.themoviedb.org/3/search/tv?query=${searchQuery}&include_adult=false&language=en-US&page=1&api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`

        to start I want to:
        (X) create a form that takes a search query
        (X) create a button that submits the form
        (X) console.log the search query when the form is submitted
        (X) create a function that handles the form submission
        (X) create a function that fetches the search results
    */

    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('movie');
    
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let apiUrl;
            let queryField;
            if (searchType === 'movie') {
                apiUrl = `https://api.themoviedb.org/3/search/movie`;
                queryField = 'title';
            } else if (searchType === 'tv') {
                apiUrl = `https://api.themoviedb.org/3/search/tv`;
                queryField = 'name';
            }

            const response = await axios.get(apiUrl, {
                params: {
                    query: searchQuery,
                    include_adult: false,
                    language: 'en-US',
                    page: 1,
                    api_key: import.meta.env.VITE_MOVIE_SEARCH_KEY
                }
            });

            const mappedResults = response.data.results.map(result => ({
                id: result.id,
                title: result[queryField],
                overview: result.overview,
            }));

            const slicedSearchResults = mappedResults.slice(0, 1);
            setSearchResults(slicedSearchResults);
            console.log('search results:', slicedSearchResults);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <nav id="navbar">
            <h1 id="navbar-header">Watch Stat Explorer</h1>
            <div id="search-form-holder">
                <h5>Search for a Movie or TV Show</h5>
                <form id="navbar-form" onSubmit={handleSubmit}>
                    <input type="text" id="search-input" placeholder="Search" value={searchQuery} onChange={handleInputChange} required />
                    <div id="navbar-form-options">
                        <select id="search-select" value={searchType} onChange={handleSearchTypeChange}>
                            <option value="movie">Movie</option>
                            <option value="tv">TV Show</option>
                        </select>
                        <button type="submit" id="search-btn">Search</button>                        
                    </div>

                </form>
                <h5>or select a trending title!</h5>
            </div>

            <div id="navbar-trending-holder">
                <h3>Movies Now Trending</h3>
                <TrendingMovieCard setSearchResults={setSearchResults} />
                <h3>Shows Now Trending</h3>
                <TrendingTVCard setSearchResults={setSearchResults} setSearchType={setSearchType} />
            </div>
        </nav>
    );
};

export default NavBar;
