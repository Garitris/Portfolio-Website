// This function will return a promise that resolves after the fade-out is complete
export const showBlackScreenAndFade = () => {
    return new Promise((resolve) => {
        const blackScreen = document.createElement('div');
        blackScreen.id = 'blackScreen';  // Assign ID to the element
        document.body.appendChild(blackScreen);  // Add to body

        // First, show the black screen for 1 second (idle time)
        setTimeout(() => {
            // Start fading out after the idle time
            blackScreen.style.transition = 'opacity 1s ease-in-out';  // Adjusted to 1s
            blackScreen.style.opacity = '0';  // Begin fade-out

            // Start animations as soon as the fade-out starts
            resolve();  // Resolve here to signal that animations can start

            // Listen for the end of the transition to remove the element
            blackScreen.addEventListener('transitionend', () => {
                blackScreen.remove();  // Remove the black screen after the fade-out completes
            });
        }, 1000);  // Idle time before fade-out starts (1 second)
    });
};
