// navbar.js

// Export function to handle the scroll event for shrinking the navbar
export const handleNavbarScroll = () => {
    // Select the navbar element by its ID
    const section = document.querySelector('#top_nav_bar');

    // Add an event listener for the scroll event
    window.addEventListener('scroll', () => {
        // Get the current scroll position on the Y-axis
        const scrollPosition = window.scrollY;

        // Calculate the new width percentage based on scroll position
        // As scroll position increases, the navbar will shrink
        let widthPercentage = 100 - (scrollPosition / 10); // Adjust the factor to control the shrinking speed

        // Ensure the width does not go below a certain value (e.g., 98%)
        if (widthPercentage < 98) {
            widthPercentage = 98;
        }

        // Apply the new width to the navbar section
        section.style.width = `${widthPercentage}%`;

        // Calculate the new top margin based on scroll position
        // The navbar's top margin will shrink as the user scrolls down
        let topMargin = 40 - (scrollPosition / 5); // Adjust the factor to control the shrinking speed of the top margin

        // Ensure the top margin does not shrink below 8px
        if (topMargin < 8) {
            topMargin = 8;
        }

        // Apply the new top margin to the navbar section
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
