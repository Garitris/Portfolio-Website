import { gsap } from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const handleStoreCollection1Anim = () => {
  const element = document.querySelector('.quadrant:nth-child(1)');
  if (!element) {
    console.warn('quadrant:nth-child(1) element not found.');
    return;
  }

  // Set the initial position of the element using gsap.set()
  gsap.set(element, {
    x: 0,           // Start from the original position horizontally (off-screen to the right)
    y: 0,            // Start 120px from the top of the page (adjust as necessary)
    opacity: 1,        // Ensure it is visible
  });

  console.log('Initial position set: ', element.style);

  // Scroll state flag to ensure animations only trigger after user scrolls
  let scrollTriggered = false;

  // Add scroll listener to detect user scrolling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0 && !scrollTriggered) {
      console.log("Page is scrolled. Now ready for animation.");
      scrollTriggered = true; // Set the flag so this doesn't log again
      initializeAnimations(); // Start animations when scrolling happens
    }
  });

  // Function to initialize the animations after scrolling starts
  function initializeAnimations() {
    // FIRST animation (Right ➜ Left)
    const firstTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 0%",   // Trigger when scroll reaches 10% from the top of the page
        markers: true,      // Debug markers
        id: "moveLeft",     // Debugging ID
        toggleActions: "play none none reverse",  // Reverse on scroll up
        onEnter: () => { console.log("First animation triggered: Moving left"); },
        onLeave: () => { console.log("First animation completed or reversed"); }
      }
    });

    firstTimeline.to(element, {
      x: -1500,              // Move to the left (off-screen left)
      duration: 1.55,       // Duration of the animation (fixed time)
      ease: "power3.inOut",  // Easing to smooth the start and end
      onStart: () => { console.log("First animation started: Moving left"); },
      onComplete: () => { console.log("First animation completed: Moved left"); }
    });

    // SECOND animation (Left ➜ Top) - Move only after first animation is complete
    firstTimeline.to(element, {
      y: -150,              // Move to the top
      duration: 1,          // Duration of the animation (fixed time)
      ease: "power3.inOut",  // Easing to smooth the start and end
      onStart: () => { console.log("Second animation started: Moving up"); },
      onComplete: () => { console.log("Second animation completed: Moved up"); }
    });
  }
};
