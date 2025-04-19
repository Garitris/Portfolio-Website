// Main function to handle gallery animation logic
export const handleMainGalleryAnimation = () => {
    // === Element Setup & Validation ===
    const galleryTrack = document.querySelector(".gallery-track");
    if (!galleryTrack) return console.error("galleryTrack not found!");

    let items = document.querySelectorAll(".gallery-track .gallery-item");
    const totalItems = items.length;
    if (totalItems === 0) return console.error("No gallery items found!");

    const firstItem = items[0];
    const lastItem = items[totalItems - 1];
    if (!firstItem || !lastItem) return console.error("First or last item not found!");

    // === Clone First and Last Items for Seamless Loop ===
    const firstClone = firstItem.cloneNode(true);
    const lastClone = lastItem.cloneNode(true);

    // Preserve hrefs in cloned items
    const firstLink = firstItem.querySelector("a");
    const lastLink = lastItem.querySelector("a");

    if (firstLink) {
        const clonedFirstLink = firstClone.querySelector("a");
        if (clonedFirstLink) clonedFirstLink.href = firstLink.href;
    }

    if (lastLink) {
        const clonedLastLink = lastClone.querySelector("a");
        if (clonedLastLink) clonedLastLink.href = lastLink.href;
    }

    // Tag cloned items
    firstClone.classList.add("gallery-item-clone");
    lastClone.classList.add("gallery-item-clone");

    // Insert clones to gallery track
    try {
        galleryTrack.insertBefore(lastClone, galleryTrack.firstChild);
        galleryTrack.appendChild(firstClone);
        console.log("Clones appended successfully");
    } catch (error) {
        console.error("Error inserting clones:", error);
    }

    // === Re-fetch items after cloning ===
    items = document.querySelectorAll(".gallery-track .gallery-item");

    // === Gallery Transition Logic ===
    let currentIndex = 1;
    let isMoving = false;
    updateGallery(false); // Initial render

    function updateGallery(animated = true) {
        galleryTrack.style.transition = animated ? "transform 0.4s ease-in-out" : "none";
        galleryTrack.style.transform = `translateX(${-currentIndex * window.innerWidth}px)`;
    }

    function moveGallery(direction) {
        if (isMoving) return;
        isMoving = true;

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
            isMoving = false;
        }, 400);
    }

    // === Scroll Management ===
    function enableScroll() {
        setTimeout(() => {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        }, 100);
    }

    function disableScroll() {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
    }

    // === Video-Triggered Visibility ===
    const isAnimationComplete = sessionStorage.getItem("animationComplete");
    const gallerySection = document.getElementById("main_gallery");

    if (isAnimationComplete === "true") {
        gallerySection.classList.remove("hidden");
        gallerySection.classList.add("visible");
        enableScroll();
    } else {
        const blackholeVideo = document.getElementById("blackhole_video");
        if (blackholeVideo) {
            blackholeVideo.addEventListener("ended", () => {
                sessionStorage.setItem("animationComplete", "true");
                gallerySection.classList.remove("hidden");
                gallerySection.classList.add("visible");
                enableScroll();
            });
        }
    }

    // === Controls and Interaction ===

    // Button controls
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    if (leftBtn && rightBtn) {
        leftBtn.addEventListener("click", () => moveGallery(-1));
        rightBtn.addEventListener("click", () => moveGallery(1));
    } else {
        console.warn("Arrow buttons not found.");
    }

    // Keyboard controls
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") moveGallery(1);
        if (event.key === "ArrowLeft") moveGallery(-1);
    });

    // Clickable gallery items
    items.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const link = item.closest("a");
            if (link) {
                console.log("Redirecting to:", link.href);
                window.location.href = link.href;
            } else {
                console.warn("No link found in this gallery item!");
            }
        });
    });

    // Responsive resizing
    window.addEventListener("resize", () => updateGallery(false));
};
