import React, { useState } from "react";
import "../styles/SearchBar.css";

interface Props {
    onSearch: (query: string) => Promise<void>;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
    const [input, setInput] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSearch(input);
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search games..."
                className="search-bar-input"
            />
            <button type="submit" className="search-bar-button">
                Search
            </button>
        </form>
    );
};

export default SearchBar;