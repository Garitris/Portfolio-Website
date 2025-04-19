// ========== IMPORTS ==========
// Red dot reveal logic (delayed or immediate)
import { revealRedDot } from "./redDotReveal.js";

// ========== EXPORTS ==========
export { setupBlackholeAnimation };

// ========== DOM ELEMENTS ==========
const videoElement = document.getElementById("blackhole_video");
const introSection = document.getElementById("intro_animation");

// ========== SCROLL CONTROL ==========
// Disable scroll during intro animation
function disableScroll() {
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    window.addEventListener("keydown", preventDefaultForScrollKeys, { passive: false });
    document.body.style.overflow = "hidden";
}

// Re-enable scroll after intro animation
function enableScroll() {
    window.removeEventListener("wheel", preventDefault, { passive: false });
    window.removeEventListener("touchmove", preventDefault, { passive: false });
    window.removeEventListener("keydown", preventDefaultForScrollKeys, { passive: false });
    document.body.style.overflow = "auto";
}

// Prevent scrolling interaction
function preventDefault(e) {
    e.preventDefault();
}

// Prevent scroll keys (spacebar, arrows, pgup/pgdn)
function preventDefaultForScrollKeys(e) {
    const keysToBlock = [32, 37, 38, 39, 40, 33, 34];
    if (keysToBlock.includes(e.keyCode)) {
        e.preventDefault();
    }
}

// ========== ANIMATION END HANDLER ==========
// What happens after video animation ends
function handleAnimationEnd() {
    videoElement.style.opacity = 0;                       // Hide video
    introSection.classList.add("visible");                // Reveal intro visuals
    enableScroll();                                       // Restore scroll
    sessionStorage.setItem("animationComplete", "true");  // Mark as viewed

    console.log("Triggering red dot reveal after animation ends...");
    revealRedDot();                                       // Trigger red dot (with delay)
}

// ========== MAIN SETUP FUNCTION ==========
// Handles whether to skip or play animation based on session
function setupBlackholeAnimation() {
    const alreadyPlayed = sessionStorage.getItem("animationComplete") === "true";

    if (alreadyPlayed) {
        // Skip animation for returning user
        videoElement.style.opacity = 0;
        introSection.classList.add("visible");
        enableScroll();
        revealRedDot(true); // ⬅️ Skip delay
    } else {
        // First-time viewer: play animation
        disableScroll();
        videoElement.addEventListener("ended", handleAnimationEnd);
    }
}

// ========== AUTO-INVOKE ON LOAD ==========
setupBlackholeAnimation();
