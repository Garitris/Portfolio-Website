// Import necessary modules and functions
import { showBlackScreenAndFade } from './loadInScreen.js'; // Import loading screen logic
import { revealRedDot } from './redDotReveal.js';           // Import red dot logic
import { handleNavbarScroll, handleNavbarHover } from './navBar.js'; // Handle scroll and hover effects of nav bar
import { storeFlavourTextBeAbsent } from "./storeFlavourTextBeAbsent.js"; // Import store flavour text animation

// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", () => {
    showBlackScreenAndFade(() => {             
        revealRedDot(true);                     // Initialize red dot logic
        handleNavbarScroll();                   // Navbar scroll behavior
        handleNavbarHover();                    // Navbar hover behavior
        storeFlavourTextBeAbsent();             // Trigger store flavor text animation
    });
});
