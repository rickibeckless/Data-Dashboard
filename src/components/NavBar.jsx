import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingMovieCard, TrendingTVCard } from "./TrendingCard";
import { CastCard, CrewCard } from './PeopleCard';

const NavBar = ({ setSearchResults, setCredits, setReviews, setRelease, handleTrendingTitleClick }) => {

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
            let apiSearchUrl;
            let queryField;
            if (searchType === 'movie') {
                apiSearchUrl = `https://api.themoviedb.org/3/search/movie`;
                queryField = 'title';
            } else if (searchType === 'tv') {
                apiSearchUrl = `https://api.themoviedb.org/3/search/tv`;
                queryField = 'name';
            }

            const response = await axios.get(apiSearchUrl, {
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
                poster_path: result.poster_path,
                media_type: searchType,
                cast: result.cast,
                crew: result.crew,
                adult: result.adult,
                release_date: result.release_date,
                release_dates: result.release_dates,
                type: result.type,
                reviews: result.reviews,
            }));

            const slicedSearchResults = mappedResults.slice(0, 1);
            setSearchResults(slicedSearchResults);

            if (slicedSearchResults.length > 0) {
                const firstResult = slicedSearchResults[0];
                let creditsUrl;
                let reviewsUrl;
                let releaseUrl;
                if (firstResult.media_type === 'movie') {
                    creditsUrl = `https://api.themoviedb.org/3/movie/${firstResult.id}/credits`;
                    reviewsUrl = `https://api.themoviedb.org/3/movie/${firstResult.id}/reviews`;
                    releaseUrl = `https://api.themoviedb.org/3/movie/${firstResult.id}/release_dates`;
                } else if (firstResult.media_type === 'tv') {
                    creditsUrl = `https://api.themoviedb.org/3/tv/${firstResult.id}/credits`;
                    reviewsUrl = `https://api.themoviedb.org/3/tv/${firstResult.id}/reviews`;
                    releaseUrl = `https://api.themoviedb.org/3/tv/${firstResult.id}/release_dates`;
                }
    
                if (creditsUrl) {
                    const creditsResponse = await axios.get(creditsUrl, {
                        params: {
                            api_key: import.meta.env.VITE_MOVIE_SEARCH_KEY
                        }
                    });
                    const reviewsResponse = await axios.get(reviewsUrl, { 
                        params: {
                            api_key: import.meta.env.VITE_MOVIE_SEARCH_KEY
                        }
                    });
                    const releaseResponse = await axios.get(releaseUrl, { 
                        params: {
                            api_key: import.meta.env.VITE_MOVIE_SEARCH_KEY
                        }
                    });

                    const creditsData = creditsResponse.data;
                    const reviewsData = reviewsResponse.data;
                    const releaseData = releaseResponse.data;
                    const creditsActorId = creditsData.cast[0].id;

                    setCredits({
                        cast: creditsData.cast || [],
                        crew: creditsData.crew || []
                    });
                }
            }
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
                        <select className="search-select" value={searchType} onChange={handleSearchTypeChange}>
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
                <TrendingMovieCard setSearchResults={setSearchResults} setCredits={setCredits} handleTrendingTitleClick={handleTrendingTitleClick} />
                <h3>Shows Now Trending</h3>
                <TrendingTVCard setSearchResults={setSearchResults} setSearchType={setSearchType} setCredits={setCredits} handleTrendingTitleClick={handleTrendingTitleClick} />
            </div>
        </nav>
    );
};

export default NavBar;
