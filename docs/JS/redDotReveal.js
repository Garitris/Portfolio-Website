// ========== IMPORTS ==========
// Function that handles the red dot's tracking and animation logic
import { initializeRedDot } from "./redDotMove.js";

// ========== RED DOT REVEAL HANDLER ==========
// This function controls when the red dot becomes visible on screen.
// It delays the reveal for dramatic effect on first load, but skips
// the delay on subsequent visits (within the same session).

export function revealRedDot(skipDelay = false) {
    const redDot = document.querySelector(".red-dot");

    // ========== SAFETY CHECK ==========
    if (!redDot) {
        console.error("Red dot element not found!");
        return;
    }

    // ========== SESSION CONTROL ==========
    const sessionSeen = sessionStorage.getItem("redDotRevealed") === "true";

    // ========== INSTANT REVEAL ==========
    // If this session has already seen the red dot, or skipDelay is set to true
    if (skipDelay || sessionSeen) {
        console.log("Red dot reveal: skipping delay (session revisit)");
        redDot.style.visibility = "visible";
        redDot.style.top = "0px"; // Drop into position
        sessionStorage.setItem("redDotRevealed", "true");
        initializeRedDot();       // Start movement behavior
        return;
    }

    // ========== DELAYED REVEAL ==========
    // For first-time visitors this session, delay the reveal
    setTimeout(() => {
        redDot.style.visibility = "visible";
        redDot.style.top = "0px"; // Drop into position
        redDot.dataset.revealed = "true";
        sessionStorage.setItem("redDotRevealed", "true");
    }, 11000);

    setTimeout(() => {
        console.log("Initializing red dot movement...");
        initializeRedDot();       // Start movement after reveal
    }, 11000);
}
