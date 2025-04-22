export const storeFlavourTextBeAbsent = () => {
    document.addEventListener('scroll', () => {
      const element = document.querySelector('.storeFlavourTextBeAbsent');
      if (!element) return;
    
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
    
      // Move the element to the left as user scrolls — tweak the multiplier for speed
      const translateX = 0 - scrollY * 0.1; // Adjust 0.1 for intensity

    // Calculate opacity based on the scroll position (increase opacity as user scrolls)
    let opacity = (scrollY / windowHeight) * 10; // Opacity will increase as user scrolls down
    opacity = Math.min(opacity, 1); // Limit opacity to 1

      // Apply the updated transform with the scrolling effect
      element.style.opacity = opacity;
      element.style.transform = `translateX(50%) translateX(${translateX}%)`;
    });
};
