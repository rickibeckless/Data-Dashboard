import React, { useState, useEffect } from 'react';
import { Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import "./App.css";
import NavBar from "./components/NavBar";
import { CastCard, CrewCard } from "./components/PeopleCard";
import RatingsCard from "./components/RatingsCard";
import { TrendingMovieCard, TrendingTVCard } from './components/TrendingCard';
import DataChartCard from './components/DataChartCard';
import ActorCard from './components/ActorCard';

function App() {

    const [searchResults, setSearchResults] = useState([]);
    const [credits, setCredits] = useState({ cast: [], crew: [] });
    const [reviews, setReviews] = useState([]);
    const [release, setRelease] = useState([]);
    const [selectedCast, setSelectedCast] = useState({});

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric',  });
    };

    const handleTrendingTitleClick = async (trendingTitleData) => {
        try {
            if (Array.isArray(trendingTitleData) && trendingTitleData.length > 0) {
                const firstResult = trendingTitleData[0];
    
                setSearchResults([firstResult]);
    
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

                    if (firstResult.media_type === 'movie') {
                        const releaseResponse = await axios.get(releaseUrl, { 
                            params: {
                                api_key: import.meta.env.VITE_MOVIE_SEARCH_KEY
                            }
                        });
                        const releaseData = releaseResponse.data;
                        setRelease(releaseData.results || []);
                    };
                    
                    const creditsData = creditsResponse.data;
                    const reviewsData = reviewsResponse.data;
    
                    setCredits({
                        cast: creditsData.cast || [],
                        crew: creditsData.crew || []
                    });
                    setReviews(reviewsData.results || []);
                }
            }
        } catch (error) {
            console.error('Error handling trending title click:', error);
        }
    };

    const handleCastClick = (actorId, actorName) => {
        const selectedActor = credits.cast.find(actor => actor.id === actorId);
        setSelectedCast(selectedActor);

        const dataChartCardElement = document.getElementById('release-stats-holder');
        if (dataChartCardElement) {
            dataChartCardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            <NavBar setSearchResults={setSearchResults} setCredits={setCredits} setReviews={setReviews} setRelease={setRelease} searchResults={searchResults} handleTrendingTitleClick={handleTrendingTitleClick} />
            <div id="title-card">
                <div id="movie-title">
                    {searchResults.length > 0 ? (
                        <div>
                            {searchResults.map(result => (
                                <div key={result.id}>
                                    <h3>{result.title || result.name}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h4>Search for your favorite MOVIES and TV shows</h4>
                    )}
                </div>
            </div>

            <div id="main-body">
                <div id="movie-description">
                    {searchResults.length > 0 ? (
                        <div>
                            {searchResults.map(result => (
                                <div key={result.id}>
                                    <p>{result.overview}</p>
                                    {result.media_type === 'movie' && (
                                        <p id="movie-description-release-date">Release Date: {formatDate(result.release_date)}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Get information about movies and TV shows</p>
                    )}
                </div>
                <div id="main-stats-holder">
                    <div id="main-stats-left">
                        <div id="people-stats-holder">
                            <CastCard cast={credits.cast} handleCastClick={handleCastClick} />
                            <CrewCard crew={credits.crew} />
                        </div>
                    </div>

                    <div id="main-stats-right">
                        <div id="main-stats-right-top" className="stats-right-holder">
                            <div id="movie-poster" className="stats-top-child">
                                {searchResults.length > 0 && (
                                    <div>
                                        {searchResults.map(result => (
                                            <div key={result.id}>
                                                {result.poster_path && (
                                                    <img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} alt="No Movie Poster Available" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div id="main-stats-right-bottom" className="stats-right-holder">
                            <div className="ratings-stats-holder stats-top-child">
                                <RatingsCard reviews={reviews} searchResults={searchResults} mediaType={searchResults.length > 0 ? searchResults[0].media_type : null} />
                            </div>
                            
                        </div>
                    </div>
                </div>
                <h3 id="data-chart-header">Select a Cast Member!</h3>
                {selectedCast && (
                    <div id="release-stats-holder" className="">
                        <DataChartCard cast={[selectedCast]} release={release} searchResults={searchResults} mediaType={searchResults.length > 0 ? searchResults[0].media_type : null} />
                    </div>
                )}
            </div>
        </>
    )
}

export default App;
