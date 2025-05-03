// promotional.js

// Export function to handle promotional bar animation
export const promotionalBarAnim = () => {
    const section = document.querySelector('#promotionalBar');

    // Ensure the section exists
    if (!section) return;

    // Use the scrollable container (body)
    const store = document.body;

    // Set initial position
    section.style.top = '0px';

    // Add scroll listener on the same container used by navbar
    store.addEventListener('scroll', () => {
        const scrollPosition = store.scrollTop;

        // Move the promo bar upwards slightly as you scroll
        const topOffset = Math.max(-scrollPosition / 1, -100);

        section.style.top = `${topOffset}px`;
    });
};
