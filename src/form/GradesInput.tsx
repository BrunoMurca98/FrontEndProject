import React, { useState, useEffect } from "react";
import { Grade } from "./Grade";
import "./GradesInput.css";
import { TranslateText } from "../lang/TranslateText";
import { withSound } from "../sound/withSound"; // Import the HOC

interface GradesInputProps {
    onGradesChange: (grades: number[]) => void;
}

export const GradesInput: React.FC<GradesInputProps> = ({ onGradesChange }) => {
    const [grades, setGrades] = useState<number[]>([]);
    const [newGrade, setNewGrade] = useState<number | null>(null);

    useEffect(() => {
        onGradesChange(grades);
    }, [grades, onGradesChange]);

    const onGradeRemove = (index: number) => () => {
        setGrades(grades.filter((_, i) => i !== index));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setNewGrade(value);
    };

    const isGradeValid = newGrade !== null && newGrade >= 0.1 && newGrade <= 10;

    const addGrade = () => {
        if (isGradeValid) {
            setGrades([...grades, newGrade!]);
            setNewGrade(null);
        }
    };

    const AddGradeButtonWithSound = withSound(({ onClick }) => (
        <button 
            data-test="add-grade-button" 
            disabled={!isGradeValid} 
            onClick={onClick}
        >
            <TranslateText translationKey="form.button.addGrade" />
        </button>
    ));

    return (
        <div>
            <div className="grades-input-container">
                <input
                    id="grades-field"
                    data-test="add-grade-input"
                    className="grades-input"
                    type="number"
                    min={0.1}
                    max={10}
                    step={0.01}
                    placeholder="10"
                    onChange={handleInputChange}
                    value={newGrade ?? ""}
                />
                <AddGradeButtonWithSound soundType="positive" onClick={addGrade} />
            </div>
            <div className="grades-list">
                {grades.map((grade, index) =>
                    <Grade key={index} value={grade} onRemove={onGradeRemove(index)} />,
                )}
            </div>
        </div>
    );
};
