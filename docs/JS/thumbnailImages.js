// thumbnailImages.js
// ==================
// Handles thumbnail clicks → update main product image

export function thumbnailImages() {
    const mainImage = document.querySelector(".main-image img");
    const thumbnails = document.querySelectorAll(".thumbnail-row img");

    if (!mainImage || thumbnails.length === 0) return; // safeguard

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", () => {
            // Swap main image source + alt text
            mainImage.src = thumbnail.src;
            mainImage.alt = thumbnail.alt;

            // Optional: highlight active thumbnail
            thumbnails.forEach(t => t.classList.remove("active"));
            thumbnail.classList.add("active");
        });
    });
}
