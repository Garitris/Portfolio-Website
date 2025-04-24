/* Function to create and manage the black screen */
export const showBlackScreenAndFade = (onFadeStartCallback) => {
    // Create the black screen element
    const blackScreen = document.createElement('div');
    blackScreen.id = 'blackScreen';  // Assign ID to the element
    document.body.appendChild(blackScreen);  // Add to body

    // Function to fade out the black screen
    const fadeOutBlackScreen = () => {
        // Set opacity to 0 to trigger the CSS transition
        blackScreen.style.opacity = '0';

        // Run any deferred logic just before fade starts
        if (typeof onFadeStartCallback === 'function') {
            onFadeStartCallback();
        }

        // After the fade-out is complete (2 seconds in this case), remove it from the DOM
        setTimeout(() => {
            blackScreen.remove(); // Clean up the DOM by removing the black screen
        }, 2000);  // 2000ms matches the fade-out duration
    };

    // Keep the black screen for a moment before fading
    setTimeout(() => {
        fadeOutBlackScreen();
    }, 1000); // 1000ms idle duration before starting fade
};

// When the page loads, trigger black screen and fade
document.addEventListener("DOMContentLoaded", () => {
    showBlackScreenAndFade();  // This version runs without any deferred logic
});

// Ensure black screen shows on page navigation (e.g., when back/forward buttons are used)
window.addEventListener('popstate', () => {
    showBlackScreenAndFade();
});
