// Handles scroll-based promo bar movement
export const promotionalBarAnim = () => {
    const section = document.querySelector('#promotionalBar');
    if (!section) return;

    const updatePosition = () => {
        const scrollY = window.scrollY;
        const offset = Math.max(-scrollY, -100);
        section.style.top = `${offset}px`;
    };

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updatePosition);
    });
};
