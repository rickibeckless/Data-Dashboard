import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatingsCard = ({ searchResults, mediaType }) => {
    const [reviews, setReviews] = useState([]);
    const movieId = searchResults.length > 0 ? searchResults[0].id : null;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (searchResults[0] && 'title' in searchResults[0]) {
                    if (movieId) {
                        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`);
                        setReviews(response.data.results);
                    }
                } else if (searchResults[0] && 'name' in searchResults[0]) {
                    if (movieId) {
                        const response = await axios.get(`https://api.themoviedb.org/3/tv/${movieId}/reviews?api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`);
                        setReviews(response.data.results);
                    }
                }
                
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        const fetchSearchReviews = async () => {
            try {
                if (mediaType === 'movie') {
                    if (movieId) {
                        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`);
                        setReviews(response.data.results);
                    }
                } else if (mediaType === 'tv') {
                    if (movieId) {
                        const response = await axios.get(`https://api.themoviedb.org/3/tv/${movieId}/reviews?api_key=${import.meta.env.VITE_MOVIE_SEARCH_KEY}`);
                        setReviews(response.data.results);
                    }
                }
                
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
        fetchSearchReviews();
    }, [movieId]);

    const truncateContent = (content, maxLength) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + '...';
        } else {
            return content;
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div id="review-card" className="ratings-card">
            <h2 className="body-card-header" id="review-card-header">
                Reviews
                <a href={`https://www.themoviedb.org/${mediaType}/${movieId}/reviews`} target="_blank" rel="noopener noreferrer" id="review-read-all">Read All Reviews</a>
            </h2>
            <ul className="review-card-list">
                {reviews.map(review => (
                    <li key={review.id} className="review-list-item">
                        <h4 className="review-list-author">{review.author}</h4>
                        <p className="review-list-date review-list-detail">Published: {formatDate(review.created_at)}</p>
                        <p className="review-list-content">
                            <span dangerouslySetInnerHTML={{ __html: truncateContent(review.content, 400) }} />
                            <a href={review.url} target="_blank" rel="noopener noreferrer" className="review-list-more-link">Read Full Review</a>
                        </p>
                        <p className="review-list-date review-list-detail">Last Updated: {formatDate(review.updated_at)}</p>
                    </li>
                ))}
            </ul>
            
        </div>
    );
};

export default RatingsCard;
