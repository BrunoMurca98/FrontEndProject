import React from "react";
import { TranslationKey } from "./translations";
import { LanguageContext } from "./LanguageContext";

interface TranslateTextProps {
    translationKey: TranslationKey;
}

// todo: use LanguageContext to get translated value
export const TranslateText: React.FC<TranslateTextProps> = ({ translationKey }) => {
    const { getTranslatedValue } = React.useContext(LanguageContext);

    const translated = getTranslatedValue(translationKey);
    // const translated = TRANSLATIONS[lang][translationKey];

    return (
        <span data-test="translated-text" data-test-key={translationKey}>{translated}</span>
    );
};
