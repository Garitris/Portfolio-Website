// Import necessary modules and functions
import { revealRedDot } from './redDotReveal.js'; // Import red dot logic
import { handleNavbarScroll, handleNavbarHover } from './navBar.js'; // Handle the scroll and hover effects of nav bar

// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded",() => {
    
    // Skip delay on the store page (no animation, reveal immediately)
    revealRedDot(true); 

    // Initialize the scroll effect for the navbar
    handleNavbarScroll();  // Start shrinking navbar on scroll

    // Initialize the hover effect for navbar buttons
    handleNavbarHover();   // Change button color on hover
})