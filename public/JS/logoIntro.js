// logo animation logic
export function setupLogoScrollAnimation() {
    const logo = document.getElementById('logo');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            logo.classList.add('shrink');
        } else {
            logo.classList.remove('shrink');
        }
    });
}
