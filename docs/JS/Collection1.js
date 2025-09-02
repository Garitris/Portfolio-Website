import { revealRedDot } from "./redDotReveal.js";
import { handleNavbarScroll, handleNavbarHover } from "./navBar.js";
import { promotionalBarAnim } from "./promotionalBar.js";
import { showBlackScreenAndFade } from './loadInScreen.js';

// ========== INITIALIZATION ==========
document.addEventListener("DOMContentLoaded", () => {
    // Force scroll to top on reload
    window.addEventListener('beforeunload', () => window.scrollTo(0, 0));

    const promoBar = document.getElementById("promotionalBar");
    if (promoBar) {
        // Make it visible immediately for pages without intro animation
        promoBar.style.display = "flex";
        // Add visible class to trigger fade-in
        requestAnimationFrame(() => promoBar.classList.add("visible"));
    }

    // Fade out black screen if present
    showBlackScreenAndFade()
        .then(() => {
            revealRedDot();
            handleNavbarScroll();
            handleNavbarHover();
            promotionalBarAnim();
        })
        .catch(error => console.error("Error during initialization:", error));
});
