import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./utils/firebaseConfig";
import { Home } from "./pages/Home";
import { FavoritesPage } from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SingUpPage";
import { GamePage } from "./pages/GamePage";
import NavBar from "./components/NavBar";
import { Game } from "./types/game";

const App: React.FC = () => {
    const [favorites, setFavorites] = useState<Game[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const docRef = doc(db, "favorites", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFavorites(docSnap.data().favorites || []);
                }
            } else {
                setFavorites([]);
            }
        });
        return () => unsubscribe();
    }, []);

    const toggleFavorite = useCallback(async (game: Game) => {
        const updatedFavorites = favorites.find((g) => g.id === game.id)
            ? favorites.filter((g) => g.id !== game.id)
            : [...favorites, game];

        setFavorites(updatedFavorites);

        if (user) {
            const docRef = doc(db, "favorites", user.uid);
            await setDoc(docRef, { favorites: updatedFavorites });
        }
    }, [favorites, user]);

    const updateRating = useCallback(async (gameId: number, userRating: number) => {
        const updatedFavorites = favorites.map((game) =>
            game.id === gameId ? { ...game, userRating } : game,
        );

        setFavorites(updatedFavorites);

        if (user) {
            const docRef = doc(db, "favorites", user.uid);
            await setDoc(docRef, { favorites: updatedFavorites });
        }
    }, [favorites, user]);

    const updatePlatinum = useCallback(async (gameId: number, isPlatinum: boolean) => {
        const updatedFavorites = favorites.map((game) =>
            game.id === gameId ? { ...game, isPlatinum } : game,
        );

        setFavorites(updatedFavorites);

        if (user) {
            const docRef = doc(db, "favorites", user.uid);
            await setDoc(docRef, { favorites: updatedFavorites });
        }
    }, [favorites, user]);

    const updateStoryCompleted = useCallback(async (gameId: number, isStoryCompleted: boolean) => {
        const updatedFavorites = favorites.map((game) =>
            game.id === gameId ? { ...game, isStoryCompleted } : game,
        );

        setFavorites(updatedFavorites);

        if (user) {
            const docRef = doc(db, "favorites", user.uid);
            await setDoc(docRef, { favorites: updatedFavorites });
        }
    }, [favorites, user]);

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/SignUp" element={<SignUpPage />} />
                <Route
                    path="/Search"
                    element={
                        user ? (
                            <Home
                                favorites={favorites}
                                onToggleFavorite={toggleFavorite}
                            />
                        ) : (
                            <Navigate to="/Login" replace={true} />)
                    }
                />
                <Route
                    path="/Favorites"
                    element={
                        user ? (
                            <FavoritesPage
                                favorites={favorites}
                                onToggleFavorite={toggleFavorite}
                                onUpdateRating={updateRating}
                                onUpdatePlatinum={updatePlatinum}
                                onUpdateStoryCompleted={updateStoryCompleted}
                            />
                        ) : (
                            <Navigate to="/Login" replace={true} />)
                    }
                />
                <Route
                    path="/game/:id"
                    element={user ? <GamePage /> : <Navigate to="/Login" replace={true} />}
                />
                <Route path="/" element={<Navigate to="/Login" replace={true} />} />
            </Routes>
        </Router>
    );
};

export { App };
