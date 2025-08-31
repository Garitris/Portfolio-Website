// smoothScroll.js

// ========== SMOOTH SCROLL INERTIA MODULE ==========

export function setupSmoothScrollInertia() {
    let targetScroll = 0;
    let currentScroll = 0;
    const ease = 0.075; // Lower = more sluggish scroll
    const scrollContainer = document.getElementById("scroll-container");

    if (!scrollContainer) {
        console.warn("Smooth scroll: #scroll-container not found.");
        return;
    }

    // Update body height to allow real scrollbar matching content height
    function updateBodyHeight() {
        document.body.style.height = `${scrollContainer.getBoundingClientRect().height}px`;
    }

    // Main animation loop that smoothly updates scroll position
    function smoothScrollLoop() {
        targetScroll = window.scrollY;
        currentScroll += (targetScroll - currentScroll) * ease;

        scrollContainer.style.transform = `translate3d(0px, -${currentScroll}px, 0px)`;
        requestAnimationFrame(smoothScrollLoop);
    }

    // Update on window resize
    window.addEventListener("resize", updateBodyHeight);

    // Initial update of body height to enable scrollbar
    updateBodyHeight();

    // Periodically update body height in case of dynamic content changes (images loading, layout shifts)
    setInterval(updateBodyHeight, 3000);

    // Start animation loop
    requestAnimationFrame(smoothScrollLoop);
}
