export const handleMainGalleryAnimation = () => {
    const galleryTrack = document.querySelector(".gallery-track");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    // Get original items BEFORE cloning
    let items = document.querySelectorAll(".gallery-item");

    const totalItems = items.length;

    // Clone first and last items (without anchor tags)
    const firstClone = items[0].cloneNode(true); // clone first image
    const lastClone = items[totalItems - 1].cloneNode(true); // clone last image

    // Append clones
    galleryTrack.appendChild(firstClone);
    galleryTrack.insertBefore(lastClone, items[0]);

    // Update items after cloning
    items = document.querySelectorAll(".gallery-track .gallery-item"); // Re-fetch updated list
    let currentIndex = 1; // Start at first real image

    // Initialize gallery at first real image
    updateGallery(false);

    // Function to update the gallery position
    function updateGallery(animated = true) {
        if (animated) {
            galleryTrack.style.transition = "transform 0.4s ease-in-out";
        } else {
            galleryTrack.style.transition = "none"; // Instantly move without animation
        }
        galleryTrack.style.transform = `translateX(${-currentIndex * window.innerWidth}px)`; // Use window.innerWidth here
    }

    // Function to handle next/previous movement
    function moveGallery(direction) {
        currentIndex += direction;
        updateGallery();

        setTimeout(() => {
            if (currentIndex >= totalItems + 1) {
                currentIndex = 1;
                updateGallery(false);
            } else if (currentIndex <= 0) {
                currentIndex = totalItems;
                updateGallery(false);
            }
        }, 400);
    }

    // Event Listeners for Gallery Item Clicks (Navigation)
    items.forEach(item => {
        item.addEventListener("click", (e) => {
            // Get the index of the clicked item
            const index = Array.from(items).indexOf(item);
            // Navigate to the corresponding page (e.g., gallery1.html, gallery2.html, etc.)
            window.location.href = `gallery${index}.html`;
        });
    });

    // Keyboard Support
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") moveGallery(1);
        if (event.key === "ArrowLeft") moveGallery(-1);
    });

    // Ensure resizing doesn't break layout
    window.addEventListener("resize", () => updateGallery(false));
};
