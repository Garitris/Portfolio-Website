import { gsap } from "https://cdn.skypack.dev/gsap";
import { redRingFollow } from "./redRing.js";

// ScrollController Module
const ScrollController = (() => {
  let isAnimating = false;
  let lastScrollY = window.scrollY;
  const animationPairs = [];

  const register = (animateIn, animateOut) => {
    animationPairs.push({ animateIn, animateOut });
  };

  const handleScroll = (event) => {
    const currentScrollY = window.scrollY;
    const deltaY = event.deltaY || (event.touches?.[0]?.clientY || 0);
    const isScrollingDown = currentScrollY > lastScrollY || deltaY > 0;

    if (isAnimating) return;

    isAnimating = true;

    const animationPromises = animationPairs.map(({ animateIn, animateOut }) =>
      isScrollingDown ? animateIn() : animateOut()
    );

    Promise.all(animationPromises).then(() => {
      isAnimating = false;
    });

    lastScrollY = currentScrollY;
  };

  const init = () => {
    document.addEventListener("wheel", handleScroll, { passive: true });
    document.addEventListener("touchmove", handleScroll, { passive: true });
    console.log("ScrollController initialized");
  };

  return {
    register,
    init,
  };
})();

// Element Animation Registration
export const animateElementOnScroll = ({
  selector,
  initialX = 0,
  initialY = 0,
  moveToX = 0,
  moveToY = 0,
  firstDuration = 1.5,
  secondDuration = 0.9,
  ease = "power3.inOut",
  startInvisible = false,
}) => {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
    return;
  }

  gsap.set(element, {
    x: initialX,
    y: initialY,
    opacity: startInvisible ? 0 : 1,
  });

  const animateIn = () => {
    return new Promise((resolve) => {
      gsap.timeline({ onComplete: resolve })
        .to(element, {
          x: moveToX,
          duration: firstDuration,
          ease,
        })
        .to(element, {
          y: moveToY,
          duration: secondDuration,
          ease,
        });
    });
  };

  const animateOut = () => {
    return new Promise((resolve) => {
      gsap.timeline({ onComplete: resolve })
        .to(element, {
          y: initialY,
          duration: secondDuration,
          ease,
        })
        .to(element, {
          x: initialX,
          duration: firstDuration,
          ease,
        });
    });
  };

  ScrollController.register(animateIn, animateOut);
};

// Initialize the ScrollController
ScrollController.init();

// Initialize Red Ring Follow after scroll animations are set up
redRingFollow();
