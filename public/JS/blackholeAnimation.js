let previousScrollY = window.scrollY; // Capture the current scroll position

// Disable scrolling during animation
export function disableScroll() {
    previousScrollY = window.scrollY; // Save scroll position

    // Disable all scrolling actions
    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
    window.addEventListener('keydown', preventDefaultForScrollKeys, { passive: false });

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${previousScrollY}px`;

    // Debugging log to verify function execution
    console.log('Scrolling disabled');
}

// Enable scrolling after animation is done
export function enableScroll() {
    // Re-enable all scrolling actions
    window.removeEventListener('wheel', preventDefault, { passive: false });
    window.removeEventListener('touchmove', preventDefault, { passive: false });
    window.removeEventListener('keydown', preventDefaultForScrollKeys, { passive: false });

    // Re-enable scroll and reset the body's position
    document.body.style.overflow = 'auto';
    document.body.style.position = ''; // Remove fixed positioning
    document.body.style.top = ''; // Reset scroll position

    // Restore the scroll position
    window.scrollTo(0, previousScrollY); // Restore scroll position

    // Debugging log to verify function execution
    console.log('Scrolling enabled');
}

// Prevent default actions for scroll, touch, and key events
function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (e.keyCode === 32 || e.keyCode === 38 || e.keyCode === 40) { // Space, Up, Down
        e.preventDefault();
    }
}

// Handle video animation and scroll disabling
export function handleBlackholeAnimation() {
    const blackholeVideo = document.getElementById('blackhole_video');
    const introAnimation = document.getElementById('intro_animation');
    
    // Disable scrolling during the animation
    disableScroll();

    // Wait for the video to end and then hide it
    blackholeVideo.addEventListener('ended', () => {
        // Fade out the video
        blackholeVideo.classList.add('hidden');
        // Optionally hide the entire intro section
        introAnimation.classList.add('hidden');
        // Re-enable scrolling after the animation
        enableScroll();
    });

    // Alternatively, you could set a timeout to hide the video after a certain period
    setTimeout(() => {
        blackholeVideo.classList.add('hidden');
        introAnimation.classList.add('hidden');
        // Re-enable scrolling after the animation
        enableScroll();
    }, 5000);  // Hide the video after 5 seconds (or adjust timing as needed)
}
