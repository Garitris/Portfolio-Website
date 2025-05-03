import { gsap } from "https://cdn.skypack.dev/gsap";

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

  // Set initial state
  gsap.set(element, {
    x: initialX,
    y: initialY,
    opacity: 1,
  });

  let triggered = false;  // To track if the animation has already been triggered
  let isAnimating = false;  // Flag to track if animation is ongoing
  let lastScrollY = window.scrollY;  // To track the last scroll position

  const startAnimation = (event) => {
    const currentScrollY = window.scrollY;
    const deltaY = event.deltaY || (event.touches ? event.touches[0].clientY : 0); // Get scroll delta

    // Check scroll direction
    const isScrollingDown = currentScrollY > lastScrollY || deltaY > 0;
    console.log(`Scroll direction: ${isScrollingDown ? "Down" : "Up"}`);

    // If animation is not running and the scroll direction is appropriate
    if (!isAnimating) {
      // Trigger the animation if scrolling down and no animation has been triggered yet
      if (isScrollingDown && !triggered) {
        triggered = true;
        console.log("Scrolling Down: Triggering animation");

        isAnimating = true;  // Set animation as in progress

        const tl = gsap.timeline()
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

        // Use total timeline duration to determine when to re-enable scroll detection
        const totalDuration = tl.duration() * 1150;
        setTimeout(() => {
          isAnimating = false;
          console.log("Animation completed: Scroll is now re-enabled");
        }, totalDuration);
      } 
      // Trigger the reverse animation if scrolling up
      else if (!isScrollingDown && triggered) {
        console.log("Scrolling Up: Reversing animation");

        isAnimating = true;  // Set animation as in progress

        // Reverse order of animation on scroll up: first move down, then move right
        const tl = gsap.timeline()
          .to(element, {
            y: initialY, // First move down
            duration: secondDuration,
            ease,
          })
          .to(element, {
            x: initialX, // Then move right
            duration: firstDuration,
            ease,
          });

        // Use total timeline duration to determine when to re-enable scroll detection
        const totalDuration = tl.duration() * 1150;
        setTimeout(() => {
          isAnimating = false;
          triggered = false; // Reset triggered for future scroll down
          console.log("Animation completed: Scroll is now re-enabled");
        }, totalDuration);
      }
    }

    // Update last scroll position for the next event
    lastScrollY = currentScrollY;

    // Prevent default scrolling behavior only when animation is happening
    if (isAnimating) {
      event.preventDefault();
    }
  };

  const addEventListeners = () => {
    // Detect wheel and touch events for scroll direction
    document.addEventListener("wheel", startAnimation, { passive: false });
    document.addEventListener("touchstart", startAnimation, { passive: false });
  };

  // Add the event listeners when the page loads
  addEventListeners();
};
