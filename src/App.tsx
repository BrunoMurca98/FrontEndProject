import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebaseConfig";
import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SingUpPage";
import GamePage from "./pages/GamePage";
import NavBar from "./components/NavBar";
import { Game } from "./types/game";

const App: React.FC = () => {
    const [favorites, setFavorites] = useState<Game[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

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
                <Route path="/SignUp" element={<SignUpPage />} />
                <Route
                    path="/Search"
                    element={user ? <Home favorites={favorites} onToggleFavorite={toggleFavorite} /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/Favorites"
                    element={user ? <FavoritesPage favorites={favorites} onToggleFavorite={toggleFavorite} /> : <Navigate to="/Login" />}
                />
                <Route path="/game/:id" element={user ? <GamePage /> : <Navigate to="/Login" />} />
                <Route path="/" element={<Navigate to="/Login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;