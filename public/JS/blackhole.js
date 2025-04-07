import { revealRedDot } from "./redDotReveal.js"; // Import red dot reveal logic

export { setupBlackholeAnimation };

const videoElement = document.getElementById("blackhole_video");
const introSection = document.getElementById("intro_animation");

// Disable scroll during animation
function disableScroll() {
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    window.addEventListener("keydown", preventDefaultForScrollKeys, { passive: false });
    document.body.style.overflow = "hidden";
}

// Enable scroll after animation
function enableScroll() {
    window.removeEventListener("wheel", preventDefault, { passive: false });
    window.removeEventListener("touchmove", preventDefault, { passive: false });
    window.removeEventListener("keydown", preventDefaultForScrollKeys, { passive: false });
    document.body.style.overflow = "auto";
}

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    const keysToBlock = [32, 37, 38, 39, 40, 33, 34];
    if (keysToBlock.includes(e.keyCode)) {
        e.preventDefault();
    }
}

// Function to handle what happens when animation ends
function handleAnimationEnd() {
    videoElement.style.opacity = 0;
    introSection.classList.add("visible");

    enableScroll();
    sessionStorage.setItem('animationComplete', 'true');

    console.log("Triggering red dot reveal after animation ends...");
    revealRedDot(); // ⬅️ Don’t skip delay on first visit
}

// Function to set up the black hole animation
function setupBlackholeAnimation() {
    const alreadyPlayed = sessionStorage.getItem("animationComplete") === "true";

    if (alreadyPlayed) {
        videoElement.style.opacity = 0;
        introSection.classList.add("visible");
        enableScroll();
        revealRedDot(true); // ⬅️ Skip the delay on revisit
    } else {
        disableScroll();
        videoElement.addEventListener("ended", handleAnimationEnd);
    }
}

// Run immediately
setupBlackholeAnimation();
