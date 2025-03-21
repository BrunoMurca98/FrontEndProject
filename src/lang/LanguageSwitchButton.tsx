import React from "react";
import { Language } from "../types";

import "./LanguageSwitch.css";
import { LanguageContext } from "./LanguageContext";

const langToFlagMap: Record<Language, string> = {
    en: "🇬🇧",
    es: "🇪🇸",
};

// todo: toggles language on click
// no need of any fancy UX. Just toggle on click :)
export const LanguageSwitchButton: React.FC = () => {
    const { currentLanguage, toggleLanguage } = React.useContext(LanguageContext);
    return (
        <div
            data-test="land-switch-button"
            data-lang={currentLanguage}
            className="lang-switch"
            onClick={toggleLanguage}
        >
            {langToFlagMap[currentLanguage]}
        </div>
    );
};
