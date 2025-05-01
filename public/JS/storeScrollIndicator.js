import { gsap } from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const storeScrollIndicator = () => {
  const indicator1 = document.getElementById('indicator-section-1');
  const indicator2 = document.getElementById('indicator-section-2');
  
  const sectionHeight = window.innerHeight; // Height of the viewport

  // Initial setup for scroll indicators
  gsap.set(indicator1, {
    backgroundColor: 'red',   // Default color
    scaleY: 1,                // Default scale
    opacity: 1,               // Default opacity
  });

  gsap.set(indicator2, {
    backgroundColor: 'red',   // Default color
    scaleY: 1,                // Default scale
    opacity: 1,             // Faded out initially
  });

  // Scroll state flag to ensure animations only trigger after the user scrolls
  let scrollTriggered = false;

  // Listen for scroll event and trigger animations
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0 && !scrollTriggered) {
      console.log("Page is scrolled. Now ready for scroll indicator animation.");
      scrollTriggered = true;
      initializeScrollIndicatorAnimations(); // Start animations after scroll
    }
  });

  // Function to initialize scroll indicator animations using ScrollTrigger
  function initializeScrollIndicatorAnimations() {
    // ScrollTrigger for the first scroll indicator (indicator1)
    gsap.timeline({
      scrollTrigger: {
        trigger: indicator1,
        start: "top 50%",       // Trigger when scroll reaches 50% of the viewport height
        markers: true,          // Debug markers
        id: "indicator1Scroll", // Debugging ID
        toggleActions: "play none none reverse",  // Reverse on scroll up
        onEnter: () => { console.log("Indicator1 animation triggered"); },
        onLeave: () => { console.log("Indicator1 animation completed or reversed"); },
      }
    })
    .to(indicator1, {
      backgroundColor: 'green', // Change color to green when active
      scaleY: 1.5,              // Slightly scale the indicator for emphasis
      duration: 0.3,            // Duration of the animation
      ease: "power3.inOut",     // Easing for smooth transition
      onStart: () => { console.log("Indicator1 animation started"); },
      onComplete: () => { console.log("Indicator1 animation completed"); }
    });

    // ScrollTrigger for the second scroll indicator (indicator2)
    gsap.timeline({
      scrollTrigger: {
        trigger: indicator2,
        start: "top 50%",       // Trigger when scroll reaches 50% of the viewport height
        markers: true,          // Debug markers
        id: "indicator2Scroll", // Debugging ID
        toggleActions: "play none none reverse",  // Reverse on scroll up
        onEnter: () => { console.log("Indicator2 animation triggered"); },
        onLeave: () => { console.log("Indicator2 animation completed or reversed"); },
      }
    })
    .to(indicator2, {
      backgroundColor: 'green', // Change color to green when active
      scaleY: 1.5,              // Slightly scale the indicator for emphasis
      duration: 0.3,            // Duration of the animation
      ease: "power3.inOut",     // Easing for smooth transition
      onStart: () => { console.log("Indicator2 animation started"); },
      onComplete: () => { console.log("Indicator2 animation completed"); }
    });
  }
};
