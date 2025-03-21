import React, { useState } from "react";
import { GradesInput } from "./GradesInput";
import { TranslateText } from "../lang/TranslateText";
import { LoadingOverlay } from "../loading-overlay/LoadingOverlay";
import "./NoteAddForm.css";
import { NetworkHandler } from "../network/NetworkHandler"; 
import { withSound } from "../sound/withSound"; // Import HOC

export const NoteAddForm: React.FC = () => {
    const [city, setCity] = useState("");
    const [dish, setDish] = useState("");
    const [grades, setGrades] = useState<number[]>([]);
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [visibleOverlay, setVisibleOverlay] = useState(false);
    const [formError, setFormError] = useState("");

    const isFormValid = city.trim() !== "" && dish.trim() !== "" && grades.length > 0 && date.trim() !== "";

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => setCity(event.target.value);
    const handleDishChange = (event: React.ChangeEvent<HTMLInputElement>) => setDish(event.target.value);
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => setDate(event.target.value);
    const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => setNotes(event.target.value);

    const handleAddClick = async () => {
        if (!isFormValid) {
            setFormError("Please fill in all required fields.");
            return;
        }

        setVisibleOverlay(true);
        setIsSubmitting(true);
        setFormError("");

        try {
            const formattedDate = new Date(date).toLocaleDateString("en-GB");

            const note = { 
                id: "id", 
                city, 
                notes, 
                favouriteDish: { name: dish }, 
                grades, 
                date: formattedDate 
            };

            console.log("Submitting Note:", note);
            await NetworkHandler.addNote(note);

            setCity("");
            setDish("");
            setGrades([]);
            setDate("");
            setNotes("");
        } catch (error) {
            console.error("Request failed: ", error);
            setFormError("Failed to save the note. Please try again.");
        } finally {
            setVisibleOverlay(false);
            setIsSubmitting(false);
        }
    };

    const SaveButtonWithSound = withSound(({ onClick }) => (
        <button
            data-test="form-save-button"
            className="button-primary"
            type="submit"
            disabled={!isFormValid || isSubmitting}
            onClick={onClick}
        >
            <TranslateText translationKey="form.button.save" />
        </button>
    ));

    return (
        <div data-test="note-add-form">
            <LoadingOverlay isVisible={visibleOverlay} />
            <h3 data-test="form-header">
                <TranslateText translationKey="form.header.add" />
            </h3>

            <label htmlFor="city-name">
                <TranslateText translationKey="form.label.city" />
            </label>
            <input data-test="form-city" type="text" placeholder="Kyiv" id="city-name" value={city} onChange={handleCityChange} />

            <label htmlFor="favourite-dish">
                <TranslateText translationKey="form.label.favouriteDish" />
            </label>
            <input data-test="form-dish" type="text" placeholder="Chicken Kyiv" id="favourite-dish" value={dish} onChange={handleDishChange} />

            <label htmlFor="note-field">
                <TranslateText translationKey="form.label.notes" />
            </label>
            <input data-test="form-dish-note" style={{ resize: "vertical" }} placeholder="Your notes here..." id="note-field" value={notes} onChange={handleNotesChange} />

            <label htmlFor="grades-field">
                <TranslateText translationKey="form.label.grades" />
            </label>
            <GradesInput onGradesChange={setGrades} />

            <label htmlFor="visit-date">
                <TranslateText translationKey="form.label.date" />
            </label>
            <input data-test="form-date" type="date" id="visit-date" value={date} onChange={handleDateChange} />

            <div className="submit-button-container">
                {formError && <div className="form-error" data-test="form-error">{formError}</div>}
                <SaveButtonWithSound soundType="positive" onClick={handleAddClick} />
            </div>
        </div>
    );
};
