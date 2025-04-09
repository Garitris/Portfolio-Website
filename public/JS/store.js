// Import necessary modules and functions
import { revealRedDot } from './redDotReveal.js'; // Import red dot logic

// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded",() => {
    
    // Skip delay on the store page (no animation, reveal immediately)
    revealRedDot(true); 
})