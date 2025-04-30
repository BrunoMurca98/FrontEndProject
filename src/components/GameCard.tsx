import React from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "../types/game";
import "../styles/GameCard.css";

interface Props {
    game: Game;
    isFavorite: boolean;
    onToggleFavorite: (game: Game) => void;
}

const GameCard: React.FC<Props> = ({ game, isFavorite, onToggleFavorite }) => {
    const navigate = useNavigate();

    const handleImageClick = () => {
        navigate(`/game/${game.id}`);
    };

    return (
        <div className="game-card">
            <div className="game-card-image" onClick={handleImageClick}>
                <img src={game.background_image} alt={game.name} />
            </div>
            <h3 className="game-card-title">{game.name}</h3>
            <p className="game-card-released">Released: {game.released}</p>
            <p className="game-card-rating">Rating: {game.rating}</p>
            <button
                onClick={() => onToggleFavorite(game)}
                className={`game-card-button ${isFavorite ? "favorite" : ""}`}
            >
                {isFavorite ? "Remove" : "Add to Favorites"}
            </button>
        </div>
    );
};

export default GameCard;