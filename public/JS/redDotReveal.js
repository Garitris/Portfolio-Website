import { initializeRedDot } from "./redDotMove.js";

// ========== RED DOT REVEAL HANDLER ==========
// This controls when the red dot becomes visible on screen
// and whether to delay its appearance for dramatic effect.
export function revealRedDot(skipDelay = false) {
    const redDot = document.querySelector(".red-dot");

    if (!redDot) {
        console.error("Red dot element not found!");
        return;
    }

    // Use sessionStorage to track whether the red dot has been revealed in this session
    const sessionSeen = sessionStorage.getItem("redDotRevealed") === "true";

    // If user revisits the page or `skipDelay` is explicitly passed, reveal immediately
    if (skipDelay || sessionSeen) {
        console.log("Red dot reveal: skipping delay (session revisit)");
        redDot.style.visibility = "visible";
        redDot.style.top = "0px"; // Drop into position
        sessionStorage.setItem("redDotRevealed", "true");
        initializeRedDot();
        return;
    }

    // ========== DELAYED REVEAL ==========
    // Only run the delayed logic if this is the first time in session

    setTimeout(() => {
        redDot.style.visibility = "visible";
        redDot.style.top = "0px"; // ← drop from top
        redDot.dataset.revealed = "true";
        sessionStorage.setItem("redDotRevealed", "true");
    }, 11000);

    setTimeout(() => {
        console.log("Initializing red dot movement...");
        initializeRedDot();
    }, 11000);
}
