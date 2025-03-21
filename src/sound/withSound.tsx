import React from "react";
import { POSITIVE_SOUND_ID, NEGATIVE_SOUND_ID } from "./SoundsContainer";

interface WithSoundProps {
    soundType: "positive" | "negative";
}

export function withSound<P extends object>(
    Component: React.FC<P & WithSoundProps>
): React.FC<P & WithSoundProps> {
    return function WrappedComponent({ soundType, ...props }) {
        const handleClick = (event: React.MouseEvent) => {
            const soundId = soundType === "positive" ? POSITIVE_SOUND_ID : NEGATIVE_SOUND_ID;
            const audio = document.getElementById(soundId) as HTMLAudioElement;
            if (audio) {
                audio.currentTime = 0; // Restart the sound if already playing
                audio.play();
            }
            if (props && (props as any).onClick) {
                (props as any).onClick(event);
            }
        };

        return <Component {...(props as P)} onClick={handleClick} />;
    };
}
