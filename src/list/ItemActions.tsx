import React, { useState } from "react";
import "./ItemActions.css";
import { TranslateText } from "../lang/TranslateText";
import { NetworkHandler } from "../network/NetworkHandler"; 
import { LoadingOverlay } from "../loading-overlay/LoadingOverlay";
import { withSound } from "../sound/withSound"; // Import HOC

interface ItemActionsProps {
    noteId: string;
    setNotes: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ItemActions: React.FC<ItemActionsProps> = ({ noteId, setNotes }) => {
    const [visibleOverlay, setVisibleOverlay] = useState(false);

    const handleRemoveClick = async () => {
        setVisibleOverlay(true);
        await NetworkHandler.removeNote(noteId).then(() => {
            setVisibleOverlay(false);
        });

        NetworkHandler.getNotes()
            .then((notes) => setNotes(notes))
            .catch((error) => console.log("Request failed: ", error));
    };

    const RemoveButtonWithSound = withSound(({ onClick }) => (
        <button 
            data-test="remove-item-button" 
            className="button button-small" 
            onClick={onClick}
        >
            <TranslateText translationKey="actions.remove" />
        </button>
    ));

    return (
        <div className="item-actions">
            <LoadingOverlay isVisible={visibleOverlay} />
            <button 
                data-test="edit-item-button" 
                className="button button-small" 
                disabled={true} 
            >
                <TranslateText translationKey="actions.edit" />
            </button>
            <RemoveButtonWithSound soundType="negative" onClick={handleRemoveClick} />
        </div>
    );
};
