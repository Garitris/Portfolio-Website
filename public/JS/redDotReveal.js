import { initializeRedDot } from "./redDotMove.js";

export function revealRedDot(skipDelay = false) {
    const redDot = document.querySelector(".red-dot");

    if (!redDot) {
        console.error("Red dot element not found!");
        return;
    }

    if (skipDelay) {
        console.log("Red dot reveal: skipping delay (session revisit)");
        redDot.style.visibility = "visible";
        redDot.style.top = "0px";
        redDot.dataset.revealed = "true"; // <-- Mark that it's been revealed
        initializeRedDot();
        return;
    }

    // Only run the delayed logic if redDot hasn't been revealed already
    if (redDot.dataset.revealed === "true") return;

    setTimeout(() => {
        redDot.style.visibility = "visible";
        redDot.style.top = "0px"; // ← drop from top
        redDot.dataset.revealed = "true"; // Mark revealed
    }, 11000);

    setTimeout(() => {
        console.log("Initializing red dot movement...");
        initializeRedDot();
    }, 11000);
}
