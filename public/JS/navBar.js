export const handleNavbarScroll = () => {
    const navbar = document.querySelector('#top_nav_bar');
    const buttons = document.querySelectorAll('.btn');

    if (!navbar) return;

    // Fade in navbar
    setTimeout(() => {
        navbar.classList.add('visible');

        // Animate buttons individually
        buttons.forEach((btn, i) => {
            btn.style.opacity = '0';
            btn.style.animation = 'none';
            void btn.offsetWidth; // force reflow
            btn.style.animation = `fadeIn 0.5s forwards ${i * 0.1}s`; // staggered fade
        });
    }, 50);

    // Scroll listener for width and vertical adjustments
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Shrink width
        let widthPercentage = 100 - (scrollY / 10);
        if (widthPercentage < 98) widthPercentage = 98;
        navbar.style.width = `${widthPercentage}%`;

        // Adjust vertical position
        let topPos = 30 - (scrollY / 5);
        if (topPos < 8) topPos = 8;
        navbar.style.transform = `translate(-50%, ${topPos}px)`;
    });
};

export const handleNavbarHover = () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => btn.style.color = '#f0a500');
        btn.addEventListener('mouseleave', () => btn.style.color = '');
    });
};
