import React from "react";
import { Favorites } from "../components/Favorites";
import { Game } from "../types/game";

interface Props {
    favorites: Game[];
    onToggleFavorite: (game: Game) => void;
    onUpdateRating: (gameId: number, rating: number) => void;
    onUpdatePlatinum: (gameId: number, isPlatinum: boolean) => void;
    onUpdateStoryCompleted: (gameId: number, isStoryCompleted: boolean) => void;
}

export const FavoritesPage: React.FC<Props> = ({
    favorites,
    onToggleFavorite,
    onUpdateRating,
    onUpdatePlatinum,
    onUpdateStoryCompleted,
}) => {
    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your Favorite Games</h1>
            <Favorites
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
                onUpdateRating={onUpdateRating}
                onUpdatePlatinum={onUpdatePlatinum}
                onUpdateStoryCompleted={onUpdateStoryCompleted}
            />
        </div>
    );
};
