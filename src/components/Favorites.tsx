import React, { useState, useCallback, useMemo } from "react";
import { Game } from "../types/game";
import { GameCard } from "./GameCard";
import "../styles/Favorites.css";
import "../styles/Home.css";

interface Props {
    favorites: Game[];
    onToggleFavorite: (game: Game) => void;
    onUpdateRating: (gameId: number, rating: number) => void;
    onUpdatePlatinum: (gameId: number, isPlatinum: boolean) => void;
    onUpdateStoryCompleted: (gameId: number, isStoryCompleted: boolean) => void;
}

const Favorites: React.FC<Props> = ({
    favorites,
    onToggleFavorite,
    onUpdateRating,
    onUpdatePlatinum,
    onUpdateStoryCompleted,
}) => {
    const [sortType, setSortType] = useState<
        "date" | "rating" | "alphabetical" | "userRating" | "completed" | "platinum"
    >("date");
    const [isReversed, setIsReversed] = useState(false);

    const handleSortChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSortType(
                e.target.value as
                    | "date"
                    | "rating"
                    | "alphabetical"
                    | "userRating"
                    | "completed"
                    | "platinum");
        },
        []);

    const handleToggleReverse = useCallback(() => {
        setIsReversed((prev) => !prev);
    }, []);

    const renderGameCard = useCallback(
        (game: Game) => (
            <GameCard
                key={game.id}
                game={game}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
                onUpdateRating={onUpdateRating}
                onUpdatePlatinum={onUpdatePlatinum}
                onUpdateStoryCompleted={onUpdateStoryCompleted}
            />
        ),
        [
            onToggleFavorite,
            onUpdateRating,
            onUpdatePlatinum,
            onUpdateStoryCompleted,
        ]);

    const sortedFavorites = useMemo(() => {
        const sorted = [...favorites].sort((a, b) => {
            let comparison = 0;
            if (sortType === "rating") {
                comparison = b.rating - a.rating;
            } else if (sortType === "userRating") {
                comparison = (b.userRating || 0) - (a.userRating || 0);
            } else if (sortType === "alphabetical") {
                comparison = a.name.localeCompare(b.name);
            } else if (sortType === "completed") {
                comparison = (b.isStoryCompleted ? 1 : 0) - (a.isStoryCompleted ? 1 : 0);
            } else if (sortType === "platinum") {
                comparison = (b.isPlatinum ? 1 : 0) - (a.isPlatinum ? 1 : 0);
            } else {
                comparison = new Date(b.released).getTime() - new Date(a.released).getTime();
            }
            return isReversed ? -comparison : comparison;
        });
        return sorted;
    }, [favorites, sortType, isReversed]);

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
                                onChange={handleSortChange}
                                className="p-2 border rounded"
                            >
                                <option value="date">Release Date</option>
                                <option value="rating">Global Rating</option>
                                <option value="userRating">My Rating</option>
                                <option value="alphabetical">Alphabetical</option>
                                <option value="completed">Completed</option>
                                <option value="platinum">Platinum</option>
                            </select>
                        </div>
                        <button
                            onClick={handleToggleReverse}
                            className={`reverse-order-button ${isReversed ? "reverse" : ""}`}
                        >
                            {isReversed ? "Reverse Order" : "Normal Order"}
                        </button>
                    </div>
                    <div className="games-grid">
                        {sortedFavorites.map(renderGameCard)}
                    </div>
                </>
            ) : (
                <p className="favorites-empty">No favorites added yet.</p>
            )}
        </div>
    );
};

export { Favorites };
