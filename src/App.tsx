import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import { Game } from "./types/game";

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
        <Router>
            <NavBar />
            <Routes>
                <Route path="/Login" element={<LoginPage />} />
                <Route
                    path="/Search"
                    element={<Home favorites={favorites} onToggleFavorite={toggleFavorite} />}
                />
                <Route
                    path="/Favorites"
                    element={<FavoritesPage favorites={favorites} onToggleFavorite={toggleFavorite} />}
                />
                <Route path="/" element={<Navigate to="/Login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;