export const handleMainGalleryAnimation = () => {
    // Ensure galleryTrack exists
    const galleryTrack = document.querySelector(".gallery-track");
    if (!galleryTrack) {
        console.error("galleryTrack not found!");
        return;
    }

    // Select items in gallery
    let items = document.querySelectorAll(".gallery-track .gallery-item");
    const totalItems = items.length;

    if (totalItems === 0) {
        console.error("No gallery items found!");
        return;
    }

    const firstItem = items[0];
    const lastItem = items[items.length - 1];

    // Check if first and last items exist
    if (!firstItem || !lastItem) {
        console.error("First or last item not found!");
        return;
    }

    // Clone the first and last items to create a seamless loop
    const firstClone = firstItem.cloneNode(true);
    const lastClone = lastItem.cloneNode(true);

    // Ensure the cloned items have the same links as the original ones
    const firstLink = firstItem.querySelector("a");
    const lastLink = lastItem.querySelector("a");

    if (firstLink) {
        const clonedFirstLink = firstClone.querySelector("a");
        clonedFirstLink.href = firstLink.href; // Set href for cloned first item
    }

    if (lastLink) {
        const clonedLastLink = lastClone.querySelector("a");
        clonedLastLink.href = lastLink.href; // Set href for cloned last item
    }

    // Add classes to cloned items for identification (optional)
    firstClone.classList.add('gallery-item-clone');
    lastClone.classList.add('gallery-item-clone');

    // Try appending clones to the track
    try {
        console.log("Appending lastClone and firstClone");

        // Append the lastClone at the beginning (before the first item)
        galleryTrack.insertBefore(lastClone, galleryTrack.firstChild); 

        // Append the firstClone at the end (after the last item)
        galleryTrack.appendChild(firstClone);

        console.log("Clones appended to the track");

    } catch (error) {
        console.error("Error inserting clones:", error);
    }

    // Re-fetch the items after insertion to ensure clones are included
    items = document.querySelectorAll(".gallery-track .gallery-item");
    console.log("Updated items:", items.length);

    let currentIndex = 1; // Start at index 1 to display the second image (the first actual gallery item)
    updateGallery(false);

    // Handle gallery visibility after animation
    const isAnimationComplete = sessionStorage.getItem('animationComplete');

    // Show the gallery only if animation is complete
    if (isAnimationComplete === 'true') {
        document.getElementById('main_gallery').classList.remove('hidden');
        document.getElementById('main_gallery').classList.add('visible');
        enableScroll(); // Enable scrolling immediately if animation is complete
    } else {
        // Set up event listener for when the animation ends
        const blackholeVideo = document.getElementById('blackhole_video');
        if (blackholeVideo) {
            blackholeVideo.addEventListener('ended', () => {
                sessionStorage.setItem('animationComplete', 'true');
                document.getElementById('main_gallery').classList.remove('hidden');
                document.getElementById('main_gallery').classList.add('visible');
                enableScroll(); // Enable scrolling after the animation ends
            });
        }
    }

    // Function to enable scrolling
    function enableScroll() {
        console.log('Enabling scroll');
        // Set a small timeout to ensure that the DOM and styles are fully updated
        setTimeout(() => {
            document.body.style.overflow = 'auto'; // Enable scrolling on the body
            document.documentElement.style.overflow = 'auto'; // Enable scrolling on the root
        }, 100); // Add a short delay to ensure styles are applied
    }

    // Function to disable scrolling (if necessary during animation)
    function disableScroll() {
        console.log('Disabling scroll');
        document.body.style.overflow = 'hidden'; // Disable scrolling
        document.documentElement.style.overflow = 'hidden'; // Disable scrolling
    }

    function updateGallery(animated = true) {
        // Apply a smooth transition if animated, otherwise no transition
        galleryTrack.style.transition = animated ? "transform 0.4s ease-in-out" : "none";
        
        // Move the gallery track to the left by the currentIndex, adjusting for screen width
        galleryTrack.style.transform = `translateX(${-currentIndex * window.innerWidth}px)`;
    }

    let isMoving = false;  // Prevent multiple clicks during transition

    function moveGallery(direction) {
        if (isMoving) return;
        isMoving = true;

        currentIndex += direction;  // Move forward or backward based on direction
        updateGallery();  // Update gallery with the new index

        setTimeout(() => {
            // Handle index wrapping around the gallery items
            if (currentIndex >= totalItems + 1) {
                currentIndex = 1; // Skip the cloned last image
                updateGallery(false); // Immediately show the first item without animation
            } else if (currentIndex <= 0) {
                currentIndex = totalItems; // Skip the cloned first image
                updateGallery(false); // Immediately show the last item without animation
            }
            isMoving = false;  // Allow for the next movement after transition
        }, 400); // Timeout to match transition duration
    }

    // Add event listeners for left and right buttons to navigate the gallery
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    if (leftBtn && rightBtn) {
        leftBtn.addEventListener("click", () => moveGallery(-1)); // Move left
        rightBtn.addEventListener("click", () => moveGallery(1));  // Move right
    } else {
        console.warn("Arrow buttons not found.");
    }

    // Image/Link Clicks: Ensure the links within images are clickable
    items.forEach(item => {
        item.addEventListener("click", (e) => {

            // Prevent the default behavior (so the browser doesn't navigate immediately)
            e.preventDefault();

            // Log the item that was clicked to verify the correct image is being selected
            console.log("Gallery item clicked:", item);

            // Select the <a> tag inside each gallery item
            const link = item.closest("a");

            // Check the link structure and log to debug
            console.log("Closest anchor tag:", link);

            // Check if the link exists and log its href to verify the redirection target
            if (link) {
                console.log("Redirecting to:", link.getAttribute("href"));
                window.location.href = link.getAttribute("href");
            } else {
                console.warn("No link found in this gallery item!");
            }
        });
    });

    // Keyboard support: Allow navigation using arrow keys
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") moveGallery(1);  // Move right with right arrow
        if (event.key === "ArrowLeft") moveGallery(-1); // Move left with left arrow
    });

    // Resize support: Update gallery position on window resize (non-animated)
    window.addEventListener("resize", () => updateGallery(false));
};
