// ========== IMPORTS ==========
// External modules for handling animations and behaviors
import { setupBlackholeAnimation } from "./blackhole.js";         // Blackhole intro animation
import { revealRedDot } from "./redDotReveal.js";                 // Reveal and initialize red dot behavior
import { handleVideoEnd } from "./dynamicTexts.js";               // Typewriter effect after video finishes
import { handleMainGalleryAnimation } from "./mainGallery.js";    // Gallery section fade-in logic
import { handleNavbarScroll, handleNavbarHover } from "./navBar.js"; // Navbar shrink on scroll + hover color effect
import { handleSectionTransition } from "./sectionTransition.js"; // Handles transition between sections
import { promotionalBarAnim } from "./promotionalBar.js";         // Handles scroll animation for promo bar
import { showBlackScreenAndFade } from "./loadInScreen.js";

// ========== INITIALIZATION ==========
// Wait for DOM to fully load before starting interactions
document.addEventListener("DOMContentLoaded", () => {
    setupBlackholeAnimation();            // Start the blackhole animation
    revealRedDot();                       // Begin red dot reveal after animation delay
    handleVideoEnd("blackhole_video", "main_gallery", 100); // Trigger text after video ends
    handleMainGalleryAnimation();         // Animate main gallery entrance
    handleNavbarScroll();                 // Enable scroll-responsive navbar behavior
    handleNavbarHover();                  // Enable navbar hover animations
    handleSectionTransition();            // Animate transition between gallery and next section
    promotionalBarAnim();                 // Scroll-based promotional bar animation  
    showBlackScreenAndFade();             // Display and fade the black screen
});

// Ensure black screen shows on page navigation (e.g., when back/forward buttons are used)
window.addEventListener('popstate', () => {
    showBlackScreenAndFade();  // Show the black screen on page navigation (back/forward)
});
