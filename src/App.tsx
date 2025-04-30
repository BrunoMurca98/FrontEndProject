import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";

const App: React.FC = () => {
    const [favorites, setFavorites] = useState<Game[]>([]);

    const toggleFavorite = (game: Game) => {
        setFavorites((prev) =>
            prev.find((g) => g.id === game.id)
                ? prev.filter((g) => g.id !== game.id)
                : [...prev, game]
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <Home />
        </div>
    );
};

export default App;