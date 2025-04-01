// Import necessary modules and functions
import { setupBlackholeAnimation } from "./blackhole.js"; // Handle blackhole animation
import { revealRedDot } from './redDotReveal.js'; // Red dot reveal function
import { handleVideoEnd } from './dynamicTexts.js'; // Handle dynamic text typing after video ends
import { handleMainGalleryAnimation } from './mainGallery.js'; // Handle second section (main gallery)
import { handleNavbarScroll, handleNavbarHover } from './navBar.js'; // Handle the scroll and hover effects of nav bar

// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", () => {
    // Start the blackhole animation
    setupBlackholeAnimation(); 

    // Execute the red dot reveal process (this will start movement after 10s)
    revealRedDot();

    // Initialize dynamic text functionality after video ends
    handleVideoEnd("blackhole_video", "main_gallery", 100);

    // Handle the second section (main gallery) animation after the video ends
    handleMainGalleryAnimation(); // Controls the second section's reveal

    // Initialize the scroll effect for the navbar
    handleNavbarScroll();  // Start shrinking navbar on scroll

    // Initialize the hover effect for navbar buttons
    handleNavbarHover();   // Change button color on hover
});
