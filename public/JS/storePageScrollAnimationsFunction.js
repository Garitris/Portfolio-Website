import { gsap } from "https://cdn.skypack.dev/gsap";

// Shared Scroll Controller Module
const ScrollController = (() => {
  let triggered = false;           // Tracks if the downward animation has been triggered
  let isAnimating = false;         // Prevents overlapping animations
  let lastScrollY = window.scrollY;

  const downCallbacks = [];        // Stores all 'scroll down' animation callbacks
  const upCallbacks = [];          // Stores all 'scroll up' animation callbacks

  const lockScroll = () => {
    document.body.style.overflow = 'hidden';
    console.log("Scroll locked");
  };

  const unlockScroll = () => {
    document.body.style.overflow = '';
    console.log("Scroll unlocked");
  };

  const handleScroll = (event) => {
    const currentScrollY = window.scrollY;
    const deltaY = event.deltaY || (event.touches?.[0]?.clientY || 0);
    const isScrollingDown = currentScrollY > lastScrollY || deltaY > 0;

    console.log(`Scroll detected — Down? ${isScrollingDown}, Current Y: ${currentScrollY}`);

    if (isAnimating) {
      console.log("Animation in progress, scroll ignored");
      event.preventDefault();
      return;
    }

    // Scroll Down Sequence
    if (isScrollingDown && !triggered) {
      console.log("Triggering DOWN animation");
      triggered = true;
      isAnimating = true;
      lockScroll();

      Promise.all(downCallbacks.map(cb => cb())).then(() => {
        console.log("DOWN animation complete");
        isAnimating = false;
        unlockScroll();
      });

      event.preventDefault();
    }

    // Scroll Up Sequence
    else if (!isScrollingDown && triggered) {
      console.log("Triggering UP animation");
      isAnimating = true;
      lockScroll();

      Promise.all(upCallbacks.map(cb => cb())).then(() => {
        console.log("UP animation complete");
        isAnimating = false;
        triggered = false;
        unlockScroll();
      });

      event.preventDefault();
    }

    lastScrollY = currentScrollY;
  };

  const init = () => {
    document.addEventListener("wheel", handleScroll, { passive: false });
    document.addEventListener("touchstart", handleScroll, { passive: false });
    console.log("ScrollController initialized");
  };

  const register = (onDown, onUp) => {
    downCallbacks.push(onDown);
    upCallbacks.push(onUp);
    console.log("Animation registered");
  };

  return { init, register };
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
}) => {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
    return;
  }

  // Set the initial position and visibility
  gsap.set(element, {
    x: initialX,
    y: initialY,
    opacity: 1,
  });

  console.log(`Initialized element: ${selector}`);

  // Animation when scrolling DOWN
  const animateIn = () => {
    return new Promise((resolve) => {
      console.log(`⬇️ Animating ${selector} in`);
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

  // Animation when scrolling UP
  const animateOut = () => {
    return new Promise((resolve) => {
      console.log(`Animating ${selector} out`);
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

  // Register the element's animations to the shared controller
  ScrollController.register(animateIn, animateOut);
};

// Call once after DOM is ready
ScrollController.init();
