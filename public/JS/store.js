// ========== IMPORTS ==========
import { gsap } from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

// Make GSAP globally available (if needed elsewhere)
window.gsap = gsap;
// Register the plugin with GSAP
gsap.registerPlugin(ScrollTrigger);


import { showBlackScreenAndFade } from './loadInScreen.js'; // Import loading screen logic
import { revealRedDot } from './redDotReveal.js';           // Import red dot logic
import { handleNavbarScroll, handleNavbarHover } from './navBar.js'; // Handle scroll and hover effects of nav bar
import { storeFlavourTextBeAbsent } from './storeFlavourTextBeAbsent.js'; // Import store flavour text animation
import { handleStoreCollection1Anim } from './storeCollection1.js'; // Import store collection 1 logic
import { handleStoreCollection2Anim } from './storeCollection2.js'; // Import store collection 2 logic
import { handleStoreInfo1Anim } from './storeInfo1.js'; // Import store collection 1 logic
import { handleStoreInfo2Anim } from './storeInfo2.js'; // Import store collection 2 logic

// ========== INITIALIZATION ==========
// Wait for DOM to fully load before starting interactions
document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('beforeunload', function() {
        window.scrollTo(0, 0);
    });
      
    showBlackScreenAndFade().then(() => {
        // Now start all other functions
        revealRedDot(true);                     // Initialize red dot logic
        handleNavbarScroll();                   // Navbar scroll behavior
        handleNavbarHover();                    // Navbar hover behavior
        storeFlavourTextBeAbsent();             // Trigger store flavor text animation
        handleStoreCollection1Anim();           // Store Collection1 logic
        handleStoreCollection2Anim();           // Store Collection2 logic
        handleStoreInfo1Anim();
        handleStoreInfo2Anim();
    });
});

