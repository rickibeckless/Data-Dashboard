import { TrendingMovieCard, TrendingTVCard } from "./TrendingCard";

const NavBar = () => {

    return (
        <nav id="navbar">
            <h1 id="navbar-header">Watch Stat Explorer</h1>
            <div id="search-form-holder">
                <h5>Search for a Movie or TV Show</h5>
                <form id="navbar-form">
                    <input type="text" id="search-input" placeholder="Search" required />
                    <button type="submit" id="search-btn">Search</button>
                </form>
                <h5>or select a trending title!</h5>
            </div>

            <div id="navbar-trending-holder">
                <h3>Movies Now Trending</h3>
                <TrendingMovieCard />
                <h3>Shows Now Trending</h3>
                <TrendingTVCard />
            </div>
        </nav>
    );
};

export default NavBar;

