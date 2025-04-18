// promotional.js

// Export function to handle promotional bar animation
export const promotionalBarAnim = () => {
    const section = document.querySelector('#promotional_bar');

    // Ensure the section exists
    if (!section) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Gradually move the bar upwards
        const topOffset = Math.max(-scrollPosition / 1, -100); // prevent from going too far

        // Apply the position to the promotional bar
        section.style.top = `${topOffset}px`;
    });
};
