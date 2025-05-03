// navbar.js

// Export function to handle the scroll event for shrinking the navbar
export const handleNavbarScroll = () => {
    // Select the navbar element by its ID
    const section = document.querySelector('#top_nav_bar');

    // Select the scrollable container (assuming #store has overflow-y: scroll)
    const store = document.body;

    // Set initial top position of the navbar
    section.style.top = '35px';

    // Add an event listener to the scrollable container instead of the window
    store.addEventListener('scroll', () => {
        // Get the current scroll position on the Y-axis of the #store container
        const scrollPosition = store.scrollTop;

        // Calculate the new width percentage based on scroll position
        // As scroll position increases, the navbar will shrink in width
        let widthPercentage = 100 - (scrollPosition / 10); // Adjust factor to control shrinking speed

        // Prevent the width from shrinking below 98%
        if (widthPercentage < 98) {
            widthPercentage = 98;
        }

        // Apply the new width to the navbar
        section.style.width = `${widthPercentage}%`;

        // Calculate the new top margin (vertical position) based on scroll position
        // The navbar moves up slightly as user scrolls
        let topMargin = 30 - (scrollPosition / 5); // Adjust factor to control vertical movement speed

        // Prevent the top margin from going below 8px
        if (topMargin < 8) {
            topMargin = 8;
        }

        // Apply the new top position to the navbar
        section.style.top = `${topMargin}px`;
    });
};

// Export function to handle the hover effect for buttons
export const handleNavbarHover = () => {
    // Select all buttons in the navbar with the class "btn"
    const buttons = document.querySelectorAll('.btn');

    // Iterate through each button and add mouse enter/leave event listeners
    buttons.forEach((button, index) => {
        // Add event listener for mouse enter (when the user hovers over the button)
        button.addEventListener('mouseenter', () => {
            // Change the button's text color on hover
            button.style.color = '#f0a500'; // Highlight color on hover
        });

        // Add event listener for mouse leave (when the user stops hovering)
        button.addEventListener('mouseleave', () => {
            // Reset the button's text color to the default
            button.style.color = ''; // Reset to original color
        });
    });
};
