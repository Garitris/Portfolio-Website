export function initializeRedDotAppearance(redDot) {
    // Initial position of the red dot (center horizontally, at the top vertically)
    const initialX = window.innerWidth / 2;  // Center horizontally
    const initialY = 0; // At the very top of the screen

    // Set the red dot's initial position
    redDot.style.position = "absolute"; // Ensure it's absolutely positioned
    redDot.style.left = `${initialX - redDot.offsetWidth / 2}px`;  // Horizontally centered
    redDot.style.top = `${initialY}px`;  // At the top of the screen

    // Start the red dot at an invisible and large state
    redDot.style.opacity = 0;
    redDot.style.transform = "scale(2)";  // Start bigger for animation

    // Remove the delay from here; control visibility through callback from animation
}

export function revealRedDot(redDot) {
    // Now this will only be called when the animation ends
    redDot.style.transition = "transform 3s ease-out, opacity 0.5s ease-out"; // Smooth transition
    redDot.style.opacity = 1; // Make it visible
    redDot.style.transform = "scale(1)"; // Shrink it back to normal size
}
