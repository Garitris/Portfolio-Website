import { initializeRedDot } from "./redDotMove.js"; // Import movement logic

export function revealRedDot() {
    const redDot = document.querySelector(".red-dot");

    if (!redDot) {
        console.error("Red dot element not found!");
        return;
    }

    // Delay the transition and start animation to make the red dot visible and shrink
    setTimeout(() => {
        // After animation ends, set visibility to visible (to ensure it stays on screen)
        setTimeout(() => {
            redDot.style.visibility = "visible"; // Ensure it's visible after animation ends
        }, 10000); // Wait for 2 seconds (the duration of the transition)
    }, 0); // Start transition immediately

    // Start red dot movement after the animation completes and the 9.9-second delay
    setTimeout(() => {
        console.log("Initializing red dot movement after animation...");
        initializeRedDot(); // Start following the cursor after the animation is complete
    }, 10000); // Delay movement by 9.9 seconds after the animation has finished
}
