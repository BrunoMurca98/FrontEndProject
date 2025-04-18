import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import GameCard from "../components/GameCard";
import Favorites from "../components/Favorites";
import { Game } from "../types/game";
import { searchGames } from "../utils/api";
import "../styles/Home.css";

const Home: React.FC = () => {
    const [query, setQuery] = useState("");
    const [games, setGames] = useState<Game[]>([]);
    const [favorites, setFavorites] = useState<Game[]>([]);
    const [sortType, setSortType] = useState<"date" | "rating" | "alphabetical">("date");
    const [isReversed, setIsReversed] = useState(false);

    const handleSearch = async (term: string) => {
        setQuery(term);
        const results = await searchGames(term);
        setGames(results);
    };

    const toggleFavorite = (game: Game) => {
        setFavorites((prev) =>
            prev.find((g) => g.id === game.id)
                ? prev.filter((g) => g.id !== game.id)
                : [...prev, game]
        );
    };

    const sortedGames = [...games].sort((a, b) => {
        let comparison = 0;
        if (sortType === "rating") {
            comparison = b.rating - a.rating;
        } else if (sortType === "alphabetical") {
            comparison = a.name.localeCompare(b.name);
        } else {
            comparison = new Date(b.released).getTime() - new Date(a.released).getTime();
        }
        return isReversed ? -comparison : comparison;
    });

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <SearchBar onSearch={handleSearch} />
            <div className="sort-controls">
                <div className="sort-by">
                    <label className="mr-2">Sort by:</label>
                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value as "date" | "rating" | "alphabetical")}
                        className="p-2 border rounded"
                    >
                        <option value="date">Release Date</option>
                        <option value="rating">Rating</option>
                        <option value="alphabetical">Alphabetical</option>
                    </select>
                </div>
                <button
                    onClick={() => setIsReversed((prev) => !prev)}
                    className="reverse-order-button"
                >
                    {isReversed ? "Normal Order" : "Reverse Order"}
                </button>
            </div>
            <div className="games-grid">
                {sortedGames.map((game) => (
                    <GameCard
                        key={game.id}
                        game={game}
                        isFavorite={favorites.some((f) => f.id === game.id)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </div>
            <Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />
        </div>
    );
};

export default Home;