// Select the section by its ID
const section = document.querySelector('#top_nav_bar');

// Listen for the scroll event
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;

    // Set the width of the section based on scroll position
    let widthPercentage = 100 - (scrollPosition / 10); // Adjust the factor to control the shrinking speed

    // Ensure the width doesn't go below a certain value (e.g., 80%)
    if (widthPercentage < 98) {
        widthPercentage = 98;
    }

    // Apply the new width to the section
    section.style.width = `${widthPercentage}%`;

    // Shrink the top margin as user scrolls down, with a minimum gap of 10px
    let topMargin = 40 - (scrollPosition / 5); // Adjust the factor to control the shrinking speed of the top margin

    // Ensure the gap doesn't go below 10px
    if (topMargin <8) {
        topMargin = 8;
    }

    // Apply the new top margin to the navbar
    section.style.top = `${topMargin}px`;
});
