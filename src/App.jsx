import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";
import NavBar from "./components/NavBar";
import { CastCard, CrewCard } from "./components/PeopleCard";
import RatingsCard from "./components/RatingsCard";
import ReleaseCard from "./components/ReleaseCard";
import { TrendingMovieCard, TrendingTVCard } from './components/TrendingCard';

function App() {

    const [searchResults, setSearchResults] = useState([]);
    const [credits, setCredits] = useState({ cast: [], crew: [] });
    const [reviews, setReviews] = useState([]);

    return (
        <>
            <NavBar setSearchResults={setSearchResults} setCredits={setCredits}  />
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
                        <h4>Search for your favorite movies and TV shows</h4>
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
                            <CastCard cast={credits.cast} />
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
                            <div id="release-stats-holder" className="stats-bottom-child">
                                <ReleaseCard />
                            </div>
                        </div>

                        <div id="main-stats-right-bottom" className="stats-right-holder">
                            <div className="ratings-stats-holder stats-top-child">
                                <RatingsCard reviews={reviews} />
                            </div>
                            <div className="ratings-stats-holder stats-bottom-child">
                                <RatingsCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;
