document.addEventListener("DOMContentLoaded", function () {
    const videoElement = document.getElementById("blackhole_video");
    const introSection = document.getElementById("intro");

    // Function to disable scrolling
    function disableScroll() {
        window.addEventListener('wheel', preventDefault, { passive: false });
        window.addEventListener('touchmove', preventDefault, { passive: false });
        window.addEventListener('keydown', preventDefaultForScrollKeys, { passive: false });
        document.body.style.overflow = 'hidden';
    }

    // Function to enable scrolling
    function enableScroll() {
        window.removeEventListener('wheel', preventDefault, { passive: false });
        window.removeEventListener('touchmove', preventDefault, { passive: false });
        window.removeEventListener('keydown', preventDefaultForScrollKeys, { passive: false });
        document.body.style.overflow = 'auto';
    }

    function preventDefault(e) {
        e.preventDefault();
    }

    function preventDefaultForScrollKeys(e) {
        if ([32, 37, 38, 39, 40, 33, 34].indexOf(e.keyCode) !== -1) {
            e.preventDefault();
        }
    }

    // Event listener for when the video ends
    videoElement.addEventListener("ended", function () {
        videoElement.style.opacity = 0;
        introSection.classList.add("visible");
        enableScroll();
        revealRedDot(); // Reveal the red dot after the video ends
    });

    disableScroll(); // Disable scrolling during the animation
});
