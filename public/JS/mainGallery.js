export const handleMainGalleryAnimation = () => {
    const mainGallery = document.getElementById("main_gallery");
    const galleryTrack = document.querySelector(".gallery-track");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    // Get original items BEFORE cloning
    let items = document.querySelectorAll(".gallery-item");
    const totalItems = items.length;

    // Clone first and last items
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 1].cloneNode(true);

    // Append clones
    galleryTrack.appendChild(firstClone);
    galleryTrack.insertBefore(lastClone, items[0]);

    // Update items after cloning
    items = document.querySelectorAll(".gallery-track img"); // Re-fetch updated list
    let currentIndex = 1; // Start at first real image

    // Function to update the gallery position
    function updateGallery(animated = true) {
        if (animated) {
            galleryTrack.style.transition = "transform 0.4s ease-in-out";
        } else {
            galleryTrack.style.transition = "none"; // Instantly move without animation
        }
        galleryTrack.style.transform = `translateX(${-currentIndex * items[0].clientWidth}px)`;
    }

    // Initialize gallery at first real image
    updateGallery(false);

    // Function to handle next/previous movement
    function moveGallery(direction) {
        currentIndex += direction;
        updateGallery();

        // Handle seamless transition after animation
        setTimeout(() => {
            if (currentIndex >= totalItems + 1) { // Reached cloned first image
                currentIndex = 1;
                updateGallery(false);
            } else if (currentIndex <= 0) { // Reached cloned last image
                currentIndex = totalItems;
                updateGallery(false);
            }
        }, 400); // Ensure transition completes first
    }

    // Event Listeners for Buttons
    rightBtn.addEventListener("click", () => moveGallery(1));  // Next
    leftBtn.addEventListener("click", () => moveGallery(-1));  // Previous

    // Keyboard Support
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") moveGallery(1);
        if (event.key === "ArrowLeft") moveGallery(-1);
    });

    // Ensure resizing doesn't break layout
    window.addEventListener("resize", () => updateGallery(false));
};
