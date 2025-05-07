import React, { useState, useCallback, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import { GameCard } from "../components/GameCard";
import { Game } from "../types/game";
import { searchGames } from "../utils/api";
import "../styles/Home.css";

interface Props {
    favorites: Game[];
    onToggleFavorite: (game: Game) => void;
}

const Home: React.FC<Props> = ({ favorites, onToggleFavorite }) => {
    const [games, setGames] = useState<Game[]>([]);
    const [sortType, setSortType] = useState<"date" | "rating" | "alphabetical">("date");
    const [isReversed, setIsReversed] = useState(false);

    const handleSearch = useCallback(async (term: string) => {
        const results = await searchGames(term);
        setGames(results);
    }, []);

    const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortType(e.target.value as "date" | "rating" | "alphabetical");
    }, []);

    const handleToggleReverse = useCallback(() => {
        setIsReversed((prev) => !prev);
    }, []);

    const renderGameCard = useCallback(
        (game: Game) => (
            <GameCard
                key={game.id}
                game={game}
                isFavorite={favorites.some((f) => f.id === game.id)}
                onToggleFavorite={onToggleFavorite}
            />
        ),
        [favorites, onToggleFavorite]);

    const sortedGames = useMemo(() => {
        const sorted = [...games].sort((a, b) => {
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
        return sorted;
    }, [games, sortType, isReversed]);

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <SearchBar onSearch={handleSearch} />
            <div className="sort-controls">
                <div className="sort-by">
                    <label className="mr-2">Sort by:</label>
                    <select
                        value={sortType}
                        onChange={handleSortChange}
                        className="p-2 border rounded"
                    >
                        <option value="date">Release Date</option>
                        <option value="rating">Rating</option>
                        <option value="alphabetical">Alphabetical</option>
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
                {sortedGames.map(renderGameCard)}
            </div>
        </div>
    );
};

export { Home };
