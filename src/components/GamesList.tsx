import React, { useState } from "react";
import { Game } from "../types/game";
import GameCard from "./GameCard";

interface Props {
    favorites: Game[];
    onToggleFavorite: (game: Game) => void;
}

const GamesList: React.FC<Props> = ({ favorites, onToggleFavorite }) => {
    const [sortType, setSortType] = useState<"date" | "rating" | "alphabetical">("date");
    const [isReversed, setIsReversed] = useState(false);

    const sorted = [...favorites].sort((a, b) => {
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
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Favorites</h2>
            <div className="mb-4 flex items-center gap-4">
                <div>
                    <label className="mr-2">Sort by:</label>
                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value as "date" | "rating" | "alphabetical")}
                        className="p-1 border rounded"
                    >
                        <option value="date">Date</option>
                        <option value="rating">Rating</option>
                        <option value="alphabetical">Alphabetical</option>
                    </select>
                </div>
                <button
                    onClick={() => setIsReversed((prev) => !prev)}
                    className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
                >
                    {isReversed ? "Reverse Order" : "Normal Order"}
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sorted.map((game) => (
                    <GameCard
                        key={game.id}
                        game={game}
                        isFavorite={true}
                        onToggleFavorite={onToggleFavorite}
                    />
                ))}
            </div>
        </div>
    );
};

export default GamesList;