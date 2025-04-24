// ========== IMPORTS ==========
// External modules for handling animations and behaviors
import { setupBlackholeAnimation } from "./blackhole.js"; // Blackhole intro animation
import { revealRedDot } from "./redDotReveal.js";         // Red dot reveal logic
import { handleVideoEnd } from "./dynamicTexts.js";       // Typewriter effect after video finishes
import { handleMainGalleryAnimation } from "./mainGallery.js"; // Gallery section fade-in
import { handleNavbarScroll, handleNavbarHover } from "./navBar.js"; // Navbar behaviors
import { handleSectionTransition } from "./sectionTransition.js"; // Section transition
import { promotionalBarAnim } from "./promotionalBar.js";  // Promo bar animation
import { showBlackScreenAndFade } from './loadInScreen.js'; // Loading screen


// ========== INITIALIZATION ==========
// Wait for DOM to fully load before starting interactions
document.addEventListener("DOMContentLoaded", async () => {
    // Wait for the black screen to fade
    await showBlackScreenAndFade(); // Wait for fade-out to start

    // Now start all other animations
    setupBlackholeAnimation(); // Blackhole animation
    revealRedDot();            // Red dot reveal
    handleVideoEnd("blackhole_video", "main_gallery", 100); // Trigger text after video ends
    handleMainGalleryAnimation(); // Main gallery entrance animation
    handleNavbarScroll(); // Navbar shrink on scroll
    handleNavbarHover();  // Navbar hover effects
    handleSectionTransition(); // Section transition effects
    promotionalBarAnim(); // Promo bar scroll animation
});