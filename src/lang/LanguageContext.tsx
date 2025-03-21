import React, { useState } from "react";
import { Language } from "../types";
import { TRANSLATIONS } from "./translations";

// the context interface
// todo: hint: use this interface to represent the context and remove 'eslint-disable' on the next line
interface LanguageState {
    currentLanguage: Language;
    toggleLanguage: () => void;
    getTranslatedValue: (key: string) => string;
}

export const LanguageContext = React.createContext<LanguageState>({
    currentLanguage: "en",
    toggleLanguage: () => {},
    getTranslatedValue: (key: string) => key,
});

interface LanguageProviderProps {
    children: React.ReactNode;
}

/*
 * todo: replace mock provider with real one
 * hint: TranslateText is used as component and main consumer of translation context
 * hint: LanguageSwitchButton is a component that uses the context to change the language
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [lang, setLang] = useState<Language>("en");
    const toggleLanguage = () => {
        if (lang === "en") {
            setLang("es");
        } else {
            setLang("en");
        }
    };

    const getTranslatedValue = (key: string) => {
        return TRANSLATIONS[lang][key];
    };
    return (
        <LanguageContext.Provider
            value={{
                currentLanguage: lang,
                toggleLanguage,
                getTranslatedValue,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};
