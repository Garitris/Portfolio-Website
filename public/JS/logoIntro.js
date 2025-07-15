// ========== LOGO SCROLL ANIMATION ==========

// Smoothly animates the centered logo based on scroll
// Uses GPU-accelerated transform (translate3d + scale) for zero lag
export function setupLogoScrollAnimation() {
    const logo = document.getElementById('logo');

    let lastKnownScrollY = 0;
    let isTicking = false;

    function onScroll() {
        lastKnownScrollY = window.scrollY;
        requestTick();
    }

    function requestTick() {
        if (!isTicking) {
            requestAnimationFrame(updateLogoTransform);
            isTicking = true;
        }
    }

    function updateLogoTransform() {
        isTicking = false;

        const scrollY = lastKnownScrollY;

        // Scale logo from 1 → 0.6 as user scrolls
        const scale = Math.max(0.6, 1 - scrollY / 800);

        // Vertical shift from center, capped at 100px
        const translateY = Math.min(scrollY * 0.2, 100);

        // Centered transform: stay centered and float upward
        logo.style.transform = `translate3d(-50%, calc(-50% + ${translateY}px), 0) scale(${scale})`;
    }

    window.addEventListener('scroll', onScroll);
}
