// Import necessary modules and functions


import { revealRedDot } from "./redDotReveal.js";         // Red dot reveal logic
import { handleNavbarScroll, handleNavbarHover } from "./navBar.js"; // Navbar behaviors
import { promotionalBarAnim } from "./promotionalBar.js";  // Promo bar animation
import { showBlackScreenAndFade } from './loadInScreen.js'; // Loading screen


// ========== INITIALIZATION ==========
// Wait for DOM to fully load before starting interactions
document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('beforeunload', function() {
        window.scrollTo(0, 0);
    });
      
    showBlackScreenAndFade()
        .then(() => {
            // Start all other functions after the loading screen fades
            
            revealRedDot();
            handleNavbarScroll();
            handleNavbarHover();
            promotionalBarAnim();
        })
        .catch((error) => {
            console.error("Error during initialization:", error);
        });
});
