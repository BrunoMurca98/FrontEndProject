import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/GamePage.css";

interface GameDetails {
    id: number;
    name: string;
    description: string;
    background_image: string;
    released: string;
    rating: number;
    platforms: { platform: { id: number; name: string } }[];
    genres: { id: number; name: string }[];
    developers: { id: number; name: string }[];
    publishers: { id: number; name: string }[];
}

const GamePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [game, setGame] = useState<GameDetails | null>(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            const response = await axios.get(
                `https://api.rawg.io/api/games/${id}?key=be6de3c659f848878a07e65041c5bfd7`
            );
            setGame(response.data);
        };

        fetchGameDetails();
    }, [id]);

    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <div className="game-page">
            <h1 className="game-title">{game.name}</h1>
            <div className="game-header">
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="game-image"
                />
                <div
                    className="game-description"
                    dangerouslySetInnerHTML={{ __html: game.description }}
                />
            </div>
            <div className="game-details">
                <p><strong>Released:</strong> {game.released}</p>
                <p><strong>Rating:</strong> {game.rating}</p>
                <p><strong>Platforms:</strong> {game.platforms.map(p => p.platform.name).join(", ")}</p>
                <p><strong>Genres:</strong> {game.genres.map(g => g.name).join(", ")}</p>
                <p><strong>Developers:</strong> {game.developers.map(d => d.name).join(", ")}</p>
                <p><strong>Publishers:</strong> {game.publishers.map(p => p.name).join(", ")}</p>
            </div>
        </div>
    );
};

export default GamePage;