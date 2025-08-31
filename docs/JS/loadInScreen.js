export const showBlackScreenAndFade = () => {
    return new Promise((resolve) => {
        const blackScreen = document.getElementById('blackScreen');

        // Wait 1 second before starting fade-out
        setTimeout(() => {
            blackScreen.style.opacity = '0';  // Start fade-out

            // Add loaded class as the fade starts
            document.body.classList.add("loaded"); // ✅ THIS LINE RESTORES PAGE FADE-IN

            // Remove after fade completes
            setTimeout(() => {
                blackScreen.remove();
                resolve(); // 
            }, 1500); // Match fade-out duration
        }, 200);
    });
};
