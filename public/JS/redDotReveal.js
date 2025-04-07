import { initializeRedDot } from "./redDotMove.js";

export function revealRedDot(skipDelay = false) {
    const redDot = document.querySelector(".red-dot");

    if (!redDot) {
        console.error("Red dot element not found!");
        return;
    }

    // If skipping delay (e.g., revisit), start immediately
    if (skipDelay) {
        redDot.style.visibility = "visible";
        redDot.style.top = "0px"; // Drop from top — adjust as needed
        initializeRedDot();
        return;
    }

    // Otherwise, run the intro logic (wait before reveal and move)
    setTimeout(() => {
        redDot.style.visibility = "visible";
    }, 11000);

    setTimeout(() => {
        console.log("Initializing red dot movement...");
        initializeRedDot();
    }, 11000);
}
