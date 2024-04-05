import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterCard = ({}) => {
    const [resultCount, setResultCount] = useState(1);
    console.log("current page: ", resultCount);

    const handleBack = async (event) => {
        event.preventDefault();
        console.log('Back button clicked');
        if (resultCount > 0) {
            setResultCount(resultCount - 1);
            console.log("current page: ", resultCount);
        }
    };

    const handleNext = async (event) => {
        event.preventDefault();
        console.log('Next button clicked');
        if (resultCount >= 0) {
            setResultCount(resultCount + 1);
            console.log("resultCount after next click: ", resultCount);
        }
    };

    return (
        <div id="filter-card">
            <div id="filter-nav-btns-holder">
                {/* <button type="submit" id="filter-prev-btn" onClick={handleBack}>Previous</button>
                <button type="submit" id="filter-next-btn" onClick={handleNext}>Next</button> */}
            </div>
        </div>
    );
};

export default FilterCard;








// WORKING WITH NEXT AND BACK BUTTONS (tracking notes from app.jsx):
    // nav, title, description, poster, cast, crew, ratings
    // not working: trending reviews
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterCard = ({}) => {
    const [resultCount, setResultCount] = useState(1);
    console.log("current page: ", resultCount);

    const handleBack = async (event) => {
        event.preventDefault();
        console.log('Back button clicked');
        if (resultCount > 0) {
            setResultCount(resultCount - 1);
            console.log("current page: ", resultCount);
        }
    };

    const handleNext = async (event) => {
        event.preventDefault();
        console.log('Next button clicked');
        if (resultCount >= 0) {
            setResultCount(resultCount + 1);
            console.log("resultCount after next click: ", resultCount);
        }
    };

    return (
        <div id="filter-card">
            <div id="filter-nav-btns-holder">
                <button type="submit" id="filter-prev-btn" onClick={handleBack}>Previous</button>
                <button type="submit" id="filter-next-btn" onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default FilterCard;
*/