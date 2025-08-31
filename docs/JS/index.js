// ========== IMPORTS ==========
// External modules for handling animations and behaviors
import { gsap } from "https://cdn.skypack.dev/gsap";
// Make GSAP globally available
window.gsap = gsap;

import { setupBlackholeAnimation } from "./blackhole.js"; // Blackhole intro animation
import { revealRedDot } from "./redDotReveal.js";         // Red dot reveal logic
import { handleMainGalleryAnimation } from "./mainGallery.js"; // Gallery section fade-in
import { handleNavbarScroll, handleNavbarHover } from "./navBar.js"; // Navbar behaviors
import { handleSectionTransition } from "./sectionTransition.js"; // Section transition
import { promotionalBarAnim } from "./promotionalBar.js";  // Promo bar animation
import { showBlackScreenAndFade } from './loadInScreen.js'; // Loading screen
import { setupLookbookCarousel } from './lookbookCarousel.js'; // matches export
import { initLookbookCarousel } from './initLookbookCarousel.js';
import { initDynamicText } from "./dynamicTexts.js";


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
          
            handleMainGalleryAnimation();
            handleNavbarScroll();
            handleNavbarHover();
            handleSectionTransition();
            promotionalBarAnim();
            setupLookbookCarousel(); // matches import/export
            initLookbookCarousel();
            initDynamicText("dynamic-text", 100);

              // ===== Debug scroll detection =====
            window.addEventListener('scroll', () => {
                console.log('Scroll detected! ScrollY:', window.scrollY);
            });
            
        })
        .catch((error) => {
            console.error("Error during initialization:", error);
        });
});
