import { gsap } from "https://cdn.skypack.dev/gsap";

// ScrollController Module (embedded)
const ScrollController = (() => {
  let isAnimating = false;
  let lastScrollY = window.scrollY;
  const animationPairs = [];

  const register = (animateIn, animateOut) => {
    animationPairs.push({ animateIn, animateOut });
  };

  const lockScroll = () => {
    document.body.style.overflow = "hidden";
    console.log("Scroll locked");
  };

  const unlockScroll = () => {
    document.body.style.overflow = "";
    console.log("Scroll unlocked");
  };

  const handleScroll = (event) => {
    const currentScrollY = window.scrollY;
    const deltaY = event.deltaY || (event.touches?.[0]?.clientY || 0);
    const isScrollingDown = currentScrollY > lastScrollY || deltaY > 0;

    if (isAnimating) {
      console.log("Animation in progress, scroll ignored");
      event.preventDefault();
      return;
    }

    isAnimating = true;
    lockScroll();

    const animationPromises = animationPairs.map(({ animateIn, animateOut }) =>
      isScrollingDown ? animateIn() : animateOut()
    );

    Promise.all(animationPromises).then(() => {
      isAnimating = false;
      unlockScroll();
    });

    event.preventDefault();
    lastScrollY = currentScrollY;
  };

  const init = () => {
    document.addEventListener("wheel", handleScroll, { passive: false });
    document.addEventListener("touchstart", handleScroll, { passive: false });
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
}) => {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
    return;
  }

  gsap.set(element, {
    x: initialX,
    y: initialY,
    opacity: 1,
  });

  console.log(`Initialized element: ${selector}`);

  const animateIn = () => {
    return new Promise((resolve) => {
      console.log(`Animating ${selector} in`);
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

  ScrollController.register(animateIn, animateOut);
};

// Call after DOM is ready
ScrollController.init();
