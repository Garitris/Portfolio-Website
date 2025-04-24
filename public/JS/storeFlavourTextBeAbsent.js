import { gsap } from "https://cdn.skypack.dev/gsap";

export const storeFlavourTextBeAbsent = () => {
  const element = document.querySelector('.storeFlavourTextBeAbsent');
  if (!element) {
    console.warn('storeFlavourTextBeAbsent element not found.');
    return;
  }

  // Define scroll thresholds and positions
  const firstThreshold = 0;  // Scroll position for the first move
  const secondThreshold = 300; // Scroll position for the second move

  const firstPosition = { x: -1000, y: 0 };  // Target for first move
  const secondPosition = { x: -1000, y: -400 }; // Target for second move

  let lastScrollY = 0; // Track last scroll position to detect scroll direction
  let isAnimating = false; // Flag to prevent overlapping animations

  const updatePosition = () => {
    const scrollY = window.scrollY;

    // Scroll Direction: If user scrolls down
    if (scrollY > lastScrollY && !isAnimating) {
      // Move to the first position when user scrolls down past the first threshold
      if (scrollY > firstThreshold && scrollY <= secondThreshold) {
        isAnimating = true; // Lock the animation until it's complete
        gsap.to(element, {
          x: firstPosition.x,
          y: firstPosition.y,
          duration: 2,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => {
            isAnimating = false; // Unlock the animation after it's done
          }
        });
      }

      // Move to the second position when user scrolls down past the second threshold
      if (scrollY > secondThreshold && !isAnimating) {
        isAnimating = true; // Lock the animation until it's complete
        gsap.to(element, {
          x: secondPosition.x,
          y: secondPosition.y,
          duration: 1.5,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => {
            isAnimating = false; // Unlock the animation after it's done
          }
        });
      }
    } 

    // Scroll Direction: If user scrolls up
    else if (scrollY < lastScrollY && !isAnimating) {
      // Return to the first position when user scrolls up past the second threshold
      if (scrollY <= secondThreshold && scrollY > firstThreshold) {
        isAnimating = true; // Lock the animation until it's complete
        gsap.to(element, {
          x: firstPosition.x,
          y: firstPosition.y,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => {
            isAnimating = false; // Unlock the animation after it's done
          }
        });
      }

      // Return to the initial position when user scrolls up before the first threshold
      if (scrollY <= firstThreshold && !isAnimating) {
        isAnimating = true; // Lock the animation until it's complete
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => {
            isAnimating = false; // Unlock the animation after it's done
          }
        });
      }
    }

    lastScrollY = scrollY; // Update the last scroll position
  };

  window.addEventListener('scroll', updatePosition);
  updatePosition(); // Initial call to set the position if needed
};
