// Import necessary modules and functions

import { setupBlackholeAnimation } from "./blackhole.js"; // Blackhole intro animation
import { revealRedDot } from "./redDotReveal.js";         // Red dot reveal logic
import { handleVideoEnd } from "./dynamicTexts.js";       // Typewriter effect after video finishes
import { handleMainGalleryAnimation } from "./mainGallery.js"; // Gallery section fade-in
import { handleNavbarScroll, handleNavbarHover } from "./navBar.js"; // Navbar behaviors
import { handleSectionTransition } from "./sectionTransition.js"; // Section transition
import { promotionalBarAnim } from "./promotionalBar.js";  // Promo bar animation
import { showBlackScreenAndFade } from './loadInScreen.js'; // Loading screen
import { setupSmoothScrollInertia } from './smoothScroll.js';


// ========== INITIALIZATION ==========
// Wait for DOM to fully load before starting interactions
document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('beforeunload', function() {
        window.scrollTo(0, 0);
    });
      
    showBlackScreenAndFade()
        .then(() => {
            // Start all other functions after the loading screen fades
            setupBlackholeAnimation();
            revealRedDot();
            handleVideoEnd("blackhole_video", "main_gallery", 100); // Ensure these arguments are correct
            handleMainGalleryAnimation();
            handleNavbarScroll();
            handleNavbarHover();
            handleSectionTransition();
            promotionalBarAnim();
            setupSmoothScrollInertia();
        })
        .catch((error) => {
            console.error("Error during initialization:", error);
        });
});
