// promotionalBar.js

export const promotionalBarAnim = () => {
    const section = document.querySelector('#promotionalBar');
    if (!section) return;

    // Set initial position
    section.style.top = '0px';

    const updatePosition = () => {
        const scrollY = window.scrollY;

        // If near the top (within 1px), snap to exactly 0
        if (scrollY < 1) {
            section.style.top = '0px';
            return;
        }

        // Otherwise move it upward, capping at -100px
        const offset = Math.max(-scrollY, -100);
        section.style.top = `${offset}px`;
    };

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updatePosition);
    });
};
