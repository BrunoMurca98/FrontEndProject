import React from "react";
import { ItemActions } from "./ItemActions";
import { Note } from "../types";

interface ListItemProps {
    note: Note; // The note object to render
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>; // The setter to update the notes state in the parent List
}

export const ListItem: React.FC<ListItemProps> = ({ note, setNotes }) => {
    return (
        <tr data-test="list-item" data-id={note.id}>
            <td data-test="list-item-city">{note.city}</td>
            <td data-test="list-item-date">{note.date}</td>
            <td data-test="list-item-dish">{note.favouriteDish.name}</td>
            <td data-test="list-item-grades">{note.grades.join(", ")}</td>
            <td data-test="list-item-actions">
                <ItemActions 
                    noteId={note.id}  // Pass the note ID to ItemActions
                    setNotes={setNotes}  // Pass the setter function to directly modify the parent state
                />
            </td>
        </tr>
    );
};
