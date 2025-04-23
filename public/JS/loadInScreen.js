export const showBlackScreenAndFade = () => {
    // Create the black screen element
    const blackScreen = document.createElement('div');
    blackScreen.id = 'blackScreen';  // Assign ID to the element
    document.body.appendChild(blackScreen);  // Add to body
  
    // Function to fade out the black screen
    const fadeOutBlackScreen = () => {
        // Set opacity to 0 to trigger the CSS transition
        blackScreen.style.opacity = '0';
  
        // After the fade-out is complete (2 seconds in this case), remove it from the DOM
        setTimeout(() => {
            blackScreen.remove(); // Clean up the DOM by removing the black screen
        }, 2000);  // 2000ms matches the fade-out duration
    };

    // Start fading out once the page has fully loaded
    fadeOutBlackScreen();
};

// When the page loads, trigger black screen and fade
document.addEventListener("DOMContentLoaded", () => {
    showBlackScreenAndFade();
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded!");  // Log to confirm this fires
    showBlackScreenAndFade();
});
