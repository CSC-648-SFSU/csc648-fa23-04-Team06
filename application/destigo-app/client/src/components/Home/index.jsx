import { useState } from "react";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // todo implement search db
    };

    const getResultsFromDB = async (term) => {
        // todo fetch results db
        return ["Results"];
    };

    return (
        <div className="home-container">
            <h4>Welcome To</h4>
            <div>
                <h1>DESTIGO</h1>
            </div>

            <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            <div className="results-container">
                {/*todo results */}
            </div>
        </div>
    )
};

export default Home;

