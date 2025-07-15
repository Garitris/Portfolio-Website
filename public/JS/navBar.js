// navbar.js

// Export function to handle the scroll event for shrinking and shifting the navbar
export const handleNavbarScroll = () => {
    // Select the navbar element by its ID
    const section = document.querySelector('#top_nav_bar');

    // Select the scrollable container (in this case, the window)
    const store = window;

    // Set the initial top position of the navbar (at page load)
    section.style.top = '35px';

    // Add a scroll listener to the window
    store.addEventListener('scroll', () => {
        // Get the current scroll position (in pixels from the top of the document)
        const scrollPosition = window.scrollY;

        // ===== WIDTH SHRINK BEHAVIOR =====
        // Shrink the navbar width based on how far the user has scrolled
        let widthPercentage = 100 - (scrollPosition / 10); // Shrink factor
        if (widthPercentage < 98) widthPercentage = 98;    // Set minimum width
        section.style.width = `${widthPercentage}%`;

        // ===== VERTICAL POSITION BEHAVIOR =====
        // If the user is at or very near the top, snap to exact starting position
        if (scrollPosition < 1) {
            section.style.top = '35px'; // Snap back to clean starting position
            return; // Skip the rest of the logic
        }

        // Otherwise, move the navbar upward as user scrolls down
        let topMargin = 30 - (scrollPosition / 5); // Adjust how fast it moves
        if (topMargin < 8) topMargin = 8;          // Limit how far up it can go
        section.style.top = `${topMargin}px`;
    });
};

// Export function to handle the hover effect for navbar buttons
export const handleNavbarHover = () => {
    // Select all buttons within the navbar
    const buttons = document.querySelectorAll('.btn');

    // Loop through each button and apply hover effects
    buttons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
            button.style.color = '#f0a500'; // Highlight color on hover
        });

        button.addEventListener('mouseleave', () => {
            button.style.color = ''; // Reset to default color on hover out
        });
    });
};
