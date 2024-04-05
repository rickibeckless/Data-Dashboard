import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CastCard = ({ cast }) => {
    return (
        <div id="cast-card" className="people-card">
            <h2 className="body-card-header">Cast</h2>
            <ul className="people-card-list">
                {cast.map(actor => (
                    <li key={`${actor.id}-${actor.character}`} className="people-list">
                        {actor.name}
                        <span className="people-right">{actor.character}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const CrewCard = ({ crew }) => {
    return (
        <div id="crew-card" className="people-card">
            <h2 className="body-card-header">Crew</h2>
            <ul className="people-card-list">
                {crew.map(member => (
                    <li key={`${member.id}-${member.job}`} className="people-list">
                        {member.name}
                        <span className="people-right">{member.job}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { CastCard, CrewCard};
