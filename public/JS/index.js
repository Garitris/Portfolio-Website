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
document.addEventListener("DOMContentLoaded", () => {
    showBlackScreenAndFade().then(() => {
        // Now start all other functions
        setupBlackholeAnimation();
        revealRedDot();
        handleVideoEnd("blackhole_video", "main_gallery", 100);
        handleMainGalleryAnimation();
        handleNavbarScroll();
        handleNavbarHover();
        handleSectionTransition();
        promotionalBarAnim();
    });
});
