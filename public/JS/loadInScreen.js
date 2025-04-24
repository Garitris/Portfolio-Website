export const showBlackScreenAndFade = () => {
    return new Promise((resolve) => {
        const blackScreen = document.getElementById('blackScreen');

        // Wait 1 second before starting fade-out
        setTimeout(() => {
            blackScreen.style.opacity = '0';  // Start fade-out
            resolve(); // Begin rest of logic

            // Remove after fade completes
            setTimeout(() => {
                blackScreen.remove();
            }, 1500); // <== This controls the fade-out *duration*
        }, 200); // <== This controls how long it's visible *before* fading starts
    });
};
