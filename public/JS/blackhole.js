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
    // Add fade-out class to intro section
    introSection.classList.add("fade-out");

    // Wait for transition to finish (1s) then remove it
    setTimeout(() => {
        introSection.remove();
        enableScroll();

        // Scroll to top of brand identity
        const brandSection = document.getElementById("brand_identity");
        if (brandSection) {
            brandSection.scrollIntoView({ behavior: "auto" });
        }

        // Mark intro as played
        sessionStorage.setItem("animationComplete", "true");

        // Trigger red dot reveal (with animation)
        revealRedDot();
    }, 1000); // match transition time
}



// ========== MAIN SETUP FUNCTION ==========
// Handles whether to skip or play animation based on session
function setupBlackholeAnimation() {
    const alreadyPlayed = sessionStorage.getItem("animationComplete") === "true";

    if (alreadyPlayed) {
        // Immediately remove the intro section if animation already played
        if (introSection) {
            introSection.remove();
        }

        // Enable scroll immediately
        enableScroll();

        // Reveal red dot instantly, skipping delay
        revealRedDot(true);
    } else {
        // First-time viewer: play animation and disable scroll
        disableScroll();
        videoElement.addEventListener("ended", handleAnimationEnd);
    }
}


// ========== AUTO-INVOKE ON LOAD ==========
setupBlackholeAnimation();
