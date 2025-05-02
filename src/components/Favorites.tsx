import React, { useState } from "react";
import { Game } from "../types/game";
import GameCard from "./GameCard";
import "../styles/Favorites.css";
import "../styles/Home.css";

interface Props {
    favorites: Game[];
    onToggleFavorite: (game: Game) => void;
    onUpdateRating: (gameId: number, rating: number) => void; // Prop to save the rating
    onUpdatePlatinum: (gameId: number, isPlatinum: boolean) => void; // Prop to save the platinum status
    onUpdateStoryCompleted: (gameId: number, isStoryCompleted: boolean) => void; // Add this line
}

const Favorites: React.FC<Props> = ({ favorites, onToggleFavorite, onUpdateRating, onUpdatePlatinum,onUpdateStoryCompleted }) => {
    const [sortType, setSortType] = useState<"date" | "rating" | "alphabetical" | "userRating">("date");
    const [isReversed, setIsReversed] = useState(false);

    const sortedFavorites = [...favorites].sort((a, b) => {
        let comparison = 0;
        if (sortType === "rating") {
            comparison = b.rating - a.rating;
        } else if (sortType === "userRating") {
            comparison = (b.userRating || 0) - (a.userRating || 0); // Sort by userRating, fallback to 0 if undefined
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
                                onChange={(e) => setSortType(e.target.value as "date" | "rating" | "alphabetical" | "userRating")}
                                className="p-2 border rounded"
                            >
                                <option value="date">Release Date</option>
                                <option value="rating">Rating</option>
                                <option value="userRating">Your Rating</option>
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
                                onUpdateRating={onUpdateRating}
                                onUpdatePlatinum={onUpdatePlatinum}
                                onUpdateStoryCompleted={onUpdateStoryCompleted} // Pass the onUpdateStoryCompleted prop
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