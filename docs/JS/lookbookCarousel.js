export function setupLookbookCarousel() {
  const carouselImages = document.querySelector("#lookbook_section .carousel-images");
  const images = document.querySelectorAll("#lookbook_section .carousel-images img");

  if (!carouselImages || images.length === 0) {
    console.warn("No lookbook images found for carousel.");
    return;
  }

  let index = 0;
  const intervalTime = 3000; // 3 seconds per image

  function showNextImage() {
    index++;
    if (index >= images.length) {
      index = 0; // loop back
    }
    carouselImages.style.transform = `translateX(-${index * 100}%)`;
  }

  // Start automatic slideshow
  setInterval(showNextImage, intervalTime);
}
