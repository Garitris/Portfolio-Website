// ========== IMPORTS ==========
import { showBlackScreenAndFade } from './loadInScreen.js';
import { revealRedDot } from './redDotReveal.js';
import { handleNavbarScroll, handleNavbarHover } from './navBar.js';
import { setupLogoScrollAnimation } from './logoIntro.js';
import { setupSmoothScrollInertia } from './smoothScroll.js';  // <-- Import smooth scroll

// ========== HELPERS ==========
// Wait for all <img> tags inside a given container to load completely
function waitForImagesToLoad(container) {
    const images = container.querySelectorAll('img');
    const promises = [];

    images.forEach(img => {
        // Skip already-loaded images
        if (img.complete) return;

        // Add a promise that resolves on load or error
        promises.push(
            new Promise(resolve => {
                img.onload = img.onerror = resolve;
            })
        );
    });

    return Promise.all(promises);
}

// ========== INITIALIZATION ==========
window.addEventListener("load", () => {
    // Lock interactions and scroll until the page is fully ready
    document.body.classList.add("loading");
    window.scrollTo(0, 0); // Force scroll to top on load

    // Reference to the section with large images
    const lookBookSection = document.getElementById('lookBook');

    // Start intro screen animation
    showBlackScreenAndFade().then(() => {
        // Wait for all lookbook images to load before initializing
        waitForImagesToLoad(lookBookSection).then(() => {
            // Initialize smooth scroll inertia first to control scroll behavior
            setupSmoothScrollInertia();

            // Initialize all other dynamic effects after smooth scroll is running
            revealRedDot(true);
            handleNavbarScroll();
            handleNavbarHover();
            setupLogoScrollAnimation();

            // Unlock scroll and interactions
            document.body.classList.remove("loading");
            document.body.classList.add("loaded");
        });
    });
});

// Scroll-reveal for photo images
const photos = document.querySelectorAll('.photo');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optionally: unobserve once visible
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1 // 10% of image visible
});

// Attach observer to all photos
photos.forEach(photo => observer.observe(photo));
