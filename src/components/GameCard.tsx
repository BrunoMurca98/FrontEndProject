import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "../types/game";
import "../styles/GameCard.css";

interface Props {
    game: Game;
    isFavorite: boolean;
    onToggleFavorite: (game: Game) => void;
    onUpdateRating?: (gameId: number, rating: number) => void; // Optional for user rating
    onUpdatePlatinum?: (gameId: number, isPlatinum: boolean) => void; // Optional for platinum status
    onUpdateStoryCompleted?: (gameId: number, isStoryCompleted: boolean) => void; // Optional for story completion
}

const GameCard: React.FC<Props> = ({
    game,
    isFavorite,
    onToggleFavorite,
    onUpdateRating,
    onUpdatePlatinum,
    onUpdateStoryCompleted,
}) => {
    const navigate = useNavigate();
    const [hoverRating, setHoverRating] = useState<number | null>(null); // Track hover state separately

    const handleImageClick = () => {
        navigate(`/game/${game.id}`);
    };

    const handleStarClick = (rating: number) => {
        if (onUpdateRating) {
            onUpdateRating(game.id, rating); // Save the user's rating to the parent component
        }
    };

    const togglePlatinum = () => {
        if (onUpdatePlatinum) {
            onUpdatePlatinum(game.id, !game.isPlatinum); // Toggle platinum status and save it
        }
    };

    const toggleStoryCompleted = () => {
        if (onUpdateStoryCompleted) {
            onUpdateStoryCompleted(game.id, !game.isStoryCompleted); // Toggle story completion status and save it
        }
    };

    const renderStars = () => {
        const stars = [];
        const userRating = hoverRating ?? game.userRating ?? 0;

        for (let i = 1; i <= 5; i++) {
            const isFullFilled = userRating >= i;
            const isHalfFilled = userRating >= i - 0.5 && userRating < i;

            stars.push(
                <span key={i} className="star-container" style={{ position: "relative", display: "inline-block" }}>
                    <span className={`star ${isFullFilled ? "filled" : isHalfFilled ? "half-filled" : ""}`}>★</span>
                    <span
                        style={{ position: "absolute", left: 0, top: 0, width: "50%", height: "100%", zIndex: 1 }}
                        onClick={() => handleStarClick(i - 0.5)}
                        onMouseEnter={() => setHoverRating(i - 0.5)}
                        onMouseLeave={() => setHoverRating(null)}
                    />
                    <span
                        style={{ position: "absolute", right: 0, top: 0, width: "50%", height: "100%", zIndex: 1 }}
                        onClick={() => handleStarClick(i)}
                        onMouseEnter={() => setHoverRating(i)}
                        onMouseLeave={() => setHoverRating(null)}
                    />
                </span>
            );
        }

        return stars;
    };

    return (
        <div className="game-card">
            <div className="game-card-image" onClick={handleImageClick}>
            <div className="game-card-image" onClick={handleImageClick}>
                <img src={game.background_image} alt={game.name} />
            </div>
            <h3 className="game-card-title">{game.name}</h3>
            <p className="game-card-released">Released: {game.released}</p>
            <p className="game-card-rating">Rating: {game.rating}</p>
            {onUpdateRating && ( // Only show "Your Rating" if onUpdateRating is provided
                <div className="game-card-user-rating">
                    <label>Your Rating:</label>
                    <div className="star-rating">{renderStars()}</div>
                </div>
            )}
            {isFavorite && (
                <>
                    {onUpdateStoryCompleted && ( // Only show "Story Completed" if onUpdateStoryCompleted is provided
                        <div className="game-card-story">
                            <label>Story Completed:</label>
                            <img
                                src={game.isStoryCompleted ? "/img/StorySelected.png" : "/img/StoryNotSelected.png"}
                                alt="Story Completed"
                                className="story"
                                onClick={toggleStoryCompleted}
                            />
                        </div>
                    )}

                    {onUpdatePlatinum && ( // Only show "Platinum" if onUpdatePlatinum is provided
                        <div className="game-card-platinum">
                            <label>Platinum:</label>
                            <img
                                src={game.isPlatinum ? "/img/TrophySelected.png" : "/img/TrophyNotSelected.png"}
                                alt="Platinum Trophy"
                                className="trophy"
                                onClick={togglePlatinum}
                            />
                        </div>
                    )}
                </>
            )}
            {!onUpdatePlatinum && !onUpdateStoryCompleted && ( // Only show genres and platforms in the Search page
                <div className="game-card-extra">
                    <p><strong>Genres:</strong> {game.genres.map((g) => g.name).join(", ")}</p>
                    <p><strong>Platforms:</strong> {game.platforms.map((p) => p.platform.name).join(", ")}</p>
                </div>
            )}
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
