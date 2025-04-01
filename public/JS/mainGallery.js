
// Function to trigger the visibility and animation of the second section
export const handleMainGalleryAnimation = () => {
    const mainGallery = document.getElementById("main_gallery");

    // Ensure the main gallery section starts hidden
    mainGallery.classList.add("hidden");

    // Wait for the blackhole animation to finish (assuming the blackhole animation triggers an event or timeout)
    // If you want to trigger the reveal after a video ends, you can use an event listener

    document.getElementById("blackhole_video").addEventListener("ended", () => {
        // Add the 'visible' class to make the section slide into view
        mainGallery.classList.remove("hidden");

        // This will trigger the CSS animation for sliding up into view
        setTimeout(() => {
            mainGallery.classList.add("visible");
        }, 500);  // Slight delay to make sure the intro section has faded in
    });
};
