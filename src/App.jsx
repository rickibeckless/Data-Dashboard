import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import TitleCard from "./components/TitleCard";
import PeopleCard from "./components/PeopleCard";
import RatingsCard from "./components/RatingsCard";
import ReleaseCard from "./components/ReleaseCard";

function App() {

    return (
        <>
            <NavBar />
            <TitleCard />

            <div id="main-body">
                <div id="movie-description">
                    <p>PLACE HOLDER DESCRIPTION</p>
                </div>
                <div id="main-stats-holder">
                    <div id="main-stats-left">
                        <div id="people-stats-holder">
                            <PeopleCard />
                            <PeopleCard />
                        </div>
                    </div>

                    <div id="main-stats-right">
                        <div id="main-stats-right-top" className="stats-right-holder">
                            <div id="movie-poster" className="stats-top-child">
                                <img src="" alt="PLACE HOLDER POSTER" />
                            </div>
                            <div id="release-stats-holder" className="stats-bottom-child">
                                <ReleaseCard />
                            </div>
                        </div>

                        <div id="main-stats-right-bottom" className="stats-right-holder">
                            <div className="ratings-stats-holder stats-top-child">
                                <RatingsCard />
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
