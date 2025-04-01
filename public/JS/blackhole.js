// Select elements needed for the animation
const videoElement = document.getElementById("blackhole_video");
const introSection = document.getElementById("intro_animation");

// Function to disable scrolling
function disableScroll() {
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    window.addEventListener("keydown", preventDefaultForScrollKeys, { passive: false });
    document.body.style.overflow = "hidden";
}

// Function to enable scrolling
function enableScroll() {
    window.removeEventListener("wheel", preventDefault, { passive: false });
    window.removeEventListener("touchmove", preventDefault, { passive: false });
    window.removeEventListener("keydown", preventDefaultForScrollKeys, { passive: false });
    document.body.style.overflow = "auto";
}

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if ([32, 37, 38, 39, 40, 33, 34].indexOf(e.keyCode) !== -1) {
        e.preventDefault();
    }
}

// Function to set up the black hole animation
function setupBlackholeAnimation() {
    videoElement.addEventListener("ended", function () {
        videoElement.style.opacity = 0;
        introSection.classList.add("visible");
        enableScroll();
    });

    disableScroll(); // Disable scrolling during the animation
}

// ✅ Export the function properly
export { setupBlackholeAnimation };
