import React from "react";
import ReactDOM from "react-dom";

import "./LoadingOverlay.css";

interface LoadingOverlayProps {
    isVisible: boolean;
}

// todo: render this overlay as a portal to a div with id "loading-overlay" (index.html, line 32)
// this may be shown from different places in app, so think how to trigger showing it
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible }) => {
    if (!isVisible) { return null; }

    return ReactDOM.createPortal(
        <div data-test="loading-overlay" className="loader-overlay">
            <span className="loader" />
        </div>,
        document.getElementById("loading-overlay")!,
    );
};
