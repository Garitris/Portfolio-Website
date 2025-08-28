// carousel.js
export function initLookbookCarousel() {
  const track = document.querySelector('.carousel-images');
  if (!track) return;

  // Duplicate the track content for seamless scroll
  const trackContent = track.innerHTML;
  track.innerHTML += trackContent;

  let x = 0;                    // Current translation in pixels
  const speed = 1.5;            // Pixels per frame, adjust as needed

  function animate() {
    x -= speed;
    // Reset when scrolled half of the total width (original set)
    if (x <= -track.scrollWidth / 2) x = 0;

    track.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(animate);
  }

  animate(); // start the animation
}
