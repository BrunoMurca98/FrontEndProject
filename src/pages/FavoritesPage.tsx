import React from "react";
import Favorites from "../components/Favorites";
import { Game } from "../types/game";

interface Props {
    favorites: Game[];
    onToggleFavorite: (game: Game) => void;
}

const FavoritesPage: React.FC<Props> = ({ favorites, onToggleFavorite }) => {
    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your Favorite Games</h1>
            <Favorites favorites={favorites} onToggleFavorite={onToggleFavorite} />
        </div>
    );
};

export default FavoritesPage;