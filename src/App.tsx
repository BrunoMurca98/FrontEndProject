import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { LoadingOverlay } from "./loading-overlay/LoadingOverlay";
import { LanguageSwitchButton } from "./lang/LanguageSwitchButton";
import { SoundsContainer } from "./sound/SoundsContainer";
import { NoteAddForm } from "./form/NoteAddForm";
import { List } from "./list/List";
import { LanguageProvider } from "./lang/LanguageContext";
import { NetworkHandler } from "./network/NetworkHandler";
import { Note } from "./types";

// todo: get data on initial render
export const App: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const [visibleOverlay, setVisibleOverlay] = useState(false);

    useEffect(() => {
        NetworkHandler.getNotes().then((notes) => {
            setNotes(notes);
        }).catch(error => {
            console.log("Request failed: ", error);
        }
        );
    });

    return (
        <LanguageProvider>
        <div className="container root-container">
            <div className="row header">
                <h2>Bob&apos;s admin</h2>
                <LanguageSwitchButton />
            </div>

            <div className="row content">
                <LoadingOverlay isVisible={visibleOverlay} />
                <div className="column column-60 left-column">
                    <List notes={notes} setNotes={setNotes}/>
                </div>
                <div className="column column-40 right-column">
                    <NoteAddForm />
                </div>
            </div>
            <SoundsContainer />
        </div>
        </LanguageProvider>
    );
};

//  <NoteAddForm setNotes = {notes} />