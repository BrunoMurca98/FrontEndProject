import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "../types/game";
import "../styles/GameCard.css";

interface Props {
    game: Game;
    isFavorite: boolean;
    onToggleFavorite: (game: Game) => void;
    onUpdateRating?: (gameId: number, rating: number) => void;
    onUpdatePlatinum?: (gameId: number, isPlatinum: boolean) => void;
    onUpdateStoryCompleted?: (gameId: number, isStoryCompleted: boolean) => void;
}

export const GameCard: React.FC<Props> = ({
    game,
    isFavorite,
    onToggleFavorite,
    onUpdateRating,
    onUpdatePlatinum,
    onUpdateStoryCompleted,
}) => {
    const navigate = useNavigate();
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    const handleImageClick = useCallback(() => {
        navigate(`/game/${game.id}`);
    }, [navigate, game.id]);

    const handleStarClick = useCallback(
        (rating: number) => {
            onUpdateRating?.(game.id, rating);
        },
        [game.id, onUpdateRating]);

    const handleStarHover = useCallback((rating: number | null) => {
        setHoverRating(rating);
    }, []);

    const togglePlatinum = useCallback(() => {
        onUpdatePlatinum?.(game.id, !game.isPlatinum);
    }, [game, onUpdatePlatinum]);

    const toggleStoryCompleted = useCallback(() => {
        onUpdateStoryCompleted?.(game.id, !game.isStoryCompleted);
    }, [game, onUpdateStoryCompleted]);

    const handleFavoriteClick = useCallback(() => {
        onToggleFavorite(game);
    }, [game, onToggleFavorite]);

    const createStarHandlers = (rating: number) => ({
        handleClick: () => handleStarClick(rating),
        handleEnter: () => handleStarHover(rating),
        handleLeave: () => handleStarHover(null),
    });

    const renderStars = () => {
        const stars = [];
        const userRating = hoverRating ?? game.userRating ?? 0;

        for (let i = 1; i <= 5; i++) {
            const isFullFilled = userRating >= i;
            const isHalfFilled = userRating >= i - 0.5 && userRating < i;
            const leftHandlers = createStarHandlers(i - 0.5);
            const rightHandlers = createStarHandlers(i);

            stars.push(
                <span key={i} className="star-container" style={{ position: "relative", display: "inline-block" }}>
                    <span className={`star ${isFullFilled ? "filled" : isHalfFilled ? "half-filled" : ""}`}>★</span>
                    <span
                        style={{ position: "absolute", left: 0, top: 0, width: "50%", height: "100%", zIndex: 1 }}
                        onClick={leftHandlers.handleClick}
                        onMouseEnter={leftHandlers.handleEnter}
                        onMouseLeave={leftHandlers.handleLeave}
                    />
                    <span
                        style={{ position: "absolute", right: 0, top: 0, width: "50%", height: "100%", zIndex: 1 }}
                        onClick={rightHandlers.handleClick}
                        onMouseEnter={rightHandlers.handleEnter}
                        onMouseLeave={rightHandlers.handleLeave}
                    />
                </span>);
        }

        return stars;
    };

    return (
        <div className="game-card">
            <div className="game-card-image" onClick={handleImageClick}>
                <img src={game.background_image} alt={game.name} />
            </div>
            <h3 className="game-card-title">{game.name}</h3>
            <p className="game-card-released">Released: {game.released}</p>
            <p className="game-card-rating">Rating: {game.rating}</p>
            {onUpdateRating && (
                <div className="game-card-user-rating">
                    <label>My Rating:</label>
                    <div className="star-rating">{renderStars()}</div>
                </div>
            )}
            {isFavorite && (
                <>
                    {onUpdateStoryCompleted && (
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
                    {onUpdatePlatinum && (
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
            {!onUpdatePlatinum && !onUpdateStoryCompleted && (
                <div className="game-card-extra">
                    <p><strong>Genres:</strong> {game.genres.map((g) => g.name).join(", ")}</p>
                    <p><strong>Platforms:</strong> {game.platforms.map((p) => p.platform.name).join(", ")}</p>
                </div>
            )}
            <button
                onClick={handleFavoriteClick}
                className={`game-card-button ${isFavorite ? "favorite" : ""}`}
            >
                {isFavorite ? "Remove" : "Add to Favorites"}
            </button>
        </div>
    );
};
