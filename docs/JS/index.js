import { gsap } from "https://cdn.skypack.dev/gsap";
window.gsap = gsap;

import { setupBlackholeAnimation } from "./blackhole.js";
import { revealRedDot } from "./redDotReveal.js";
import { handleMainGalleryAnimation } from "./mainGallery.js";
import { handleNavbarScroll, handleNavbarHover } from "./navBar.js";
import { handleSectionTransition } from "./sectionTransition.js";
import { promotionalBarAnim } from "./promotionalBar.js";
import { showBlackScreenAndFade } from "./loadInScreen.js";
import { setupLookbookCarousel } from "./lookbookCarousel.js";
import { initLookbookCarousel } from "./initLookbookCarousel.js";
import { initDynamicText } from "./dynamicTexts.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    window.addEventListener("beforeunload", () => window.scrollTo(0, 0));

    const promoBar = document.getElementById("promotionalBar");
    if (promoBar) promoBar.style.display = "none"; // hide initially

    // Handle promo button click
    const promoButton = document.querySelector(".promo_button button");
    if (promoButton) {
      promoButton.addEventListener("click", () => window.location.href = "/promo.html");
    }

    // Wait for black screen fade
    await showBlackScreenAndFade();
    console.log("Black screen fade complete");

    // Wait for intro video to end
    const blackholeVideo = document.getElementById("blackhole_video");
    if (blackholeVideo) {
      await new Promise(resolve => {
        if (blackholeVideo.ended) return resolve();
        blackholeVideo.addEventListener("ended", resolve);
      });
    }

    // Show promo bar
    if (promoBar) {
      promoBar.style.display = "flex";
      requestAnimationFrame(() => promoBar.classList.add("visible"));
    }

    // Make main gallery visible
    const mainGallery = document.getElementById("main_gallery");
    if (mainGallery) {
      mainGallery.classList.remove("hidden");
      mainGallery.classList.add("visible");
      document.body.style.overflow = "auto";
    }

    // Start all other animations & behaviors
    setupBlackholeAnimation();
    revealRedDot();
    handleMainGalleryAnimation(); // now safe to initialize
    handleNavbarScroll();
    handleNavbarHover();
    handleSectionTransition();
    promotionalBarAnim();
    setupLookbookCarousel();
    initLookbookCarousel();
    initDynamicText("dynamic-text", 100);

    console.log("Initialization complete");
  } catch (err) {
    console.error("Error during initialization", err);
  }
});
