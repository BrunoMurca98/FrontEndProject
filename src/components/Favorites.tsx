import React from "react";
import { Game } from "../types/game";
import GamesList from "./GamesList";
import "../styles/Favorites.css";

interface Props {
    favorites: Game[];
    onToggleFavorite: (game: Game) => void;
}

const Favorites: React.FC<Props> = ({ favorites, onToggleFavorite }) => {
    return (
        <div className="favorites">
            <h2 className="favorites-title">Your Favorites</h2>
            {favorites.length > 0 ? (
                <GamesList favorites={favorites} onToggleFavorite={onToggleFavorite} />
            ) : (
                <p className="favorites-empty">No favorites added yet.</p>
            )}
        </div>
    );
};

export default Favorites;