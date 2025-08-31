export const handleNavbarScroll = () => {
    const navbar = document.querySelector('#top_nav_bar');
    const buttons = document.querySelectorAll('.btn');

    if (!navbar) return;

    // Fade-in navbar on page load
    setTimeout(() => {
        navbar.classList.add('visible');

        // Animate buttons individually with stagger
        buttons.forEach((btn, i) => {
            btn.style.opacity = '0';
            btn.style.animation = 'none';
            void btn.offsetWidth; // force reflow
            btn.style.animation = `fadeIn 0.5s forwards ${i * 0.1}s`;
        });
    }, 50);

    // Scroll listener
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Shrink navbar width slightly
        let widthPercentage = 100 - (scrollY / 10);
        if (widthPercentage < 98) widthPercentage = 98;
        navbar.style.width = `${widthPercentage}%`;

        // Move navbar upward as user scrolls
        let topPos = 35 - scrollY / 5; // adjust speed of upward movement
        if (topPos < 8) topPos = 8;    // set a minimum top position
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
