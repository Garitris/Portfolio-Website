export const storeFlavourTextBeAbsent = () => {
  const threshold = 1000;
  const maxLeftShift = 1000; // in px
  const element = document.querySelector('.storeFlavourTextBeAbsent');
  if (!element) return;

  let currentX = 0;
  let currentY = 0;

  const update = () => {
    const scrollY = window.scrollY;

    let targetX = 0;
    let targetY = 0;

    if (scrollY <= threshold) {
      const step = maxLeftShift / threshold;
      targetX = -Math.floor(scrollY * step);
      targetY = 0;
    } else {
      targetX = -maxLeftShift;
      targetY = -Math.floor(scrollY - threshold);
    }

    // Apply transform only when there's a change
    if (targetX !== currentX || targetY !== currentY) {
      element.style.transform = `translate(${targetX}px, ${targetY}px)`;
      currentX = targetX;
      currentY = targetY;
    }

    requestAnimationFrame(update);
  };

  update();
};
