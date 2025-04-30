import React, { useState } from "react";
import { Game } from "../types/game";
import GameCard from "./GameCard";
import "../styles/Favorites.css";
import "../styles/Home.css";

interface Props {
    favorites: Game[];
    onToggleFavorite: (game: Game) => void;
}

const Favorites: React.FC<Props> = ({ favorites, onToggleFavorite }) => {
    const [sortType, setSortType] = useState<"date" | "rating" | "alphabetical">("date");
    const [isReversed, setIsReversed] = useState(false);

    const sortedFavorites = [...favorites].sort((a, b) => {
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
        <div className="favorites">
            <h2 className="favorites-title">Your Favorites</h2>
            {favorites.length > 0 ? (
                <>
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
                            className={`reverse-order-button ${isReversed ? "reverse" : ""}`}
                        >
                            {isReversed ? "Reverse Order" : "Normal Order"}
                        </button>
                    </div>
                    <div className="games-grid">
                        {sortedFavorites.map((game) => (
                            <GameCard
                                key={game.id}
                                game={game}
                                isFavorite={true}
                                onToggleFavorite={onToggleFavorite}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <p className="favorites-empty">No favorites added yet.</p>
            )}
        </div>
    );
};

export default Favorites;