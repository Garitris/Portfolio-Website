// Red dot animation code (standalone)

const redDot = document.querySelector(".red-dot");

// Initial position of the red dot (horizontally in the middle, vertically at the top)
const initialX = window.innerWidth / 2;  // Center horizontally
const initialY = 0; // At the very top of the screen

let currentX = initialX;
let currentY = initialY;
let targetX = initialX;
let targetY = initialY;

// Define the speed of movement (higher values make the dot move faster)
const speed = 0.006;

// Function to update the red dot's position smoothly
function updateRedDotPosition() {
    const dx = targetX - currentX;
    const dy = targetY - currentY;

    currentX += dx * speed;
    currentY += dy * speed;

    redDot.style.left = `${currentX}px`;
    redDot.style.top = `${currentY}px`;

    requestAnimationFrame(updateRedDotPosition);
}

// Function to reveal the red dot after animation ends
function revealRedDot() {
    // Start the red dot at an invisible and large state
    redDot.style.opacity = 0;
    redDot.style.transform = "scale(2)";  // Start with a large size

    // Once the intro animation ends (after 2 seconds, for example), start showing the dot
    setTimeout(() => {
        // Reveal the red dot
        redDot.style.transition = "transform 3s ease-out, opacity 0.5s ease-out"; // Transition for smooth effect
        redDot.style.opacity = 1; // Make it visible
        redDot.style.transform = "scale(1)"; // Shrink back to normal size
        updateRedDotPosition(); // Start the red dot movement tracking
    }, 10000); // Adjust this to match your animation duration
}

// Listen for mouse movement to update target position
document.addEventListener('mousemove', (e) => {
    targetX = e.pageX;
    targetY = e.pageY;
});

// Function to trigger the red dot's appearance after animation ends
function startRedDotAfterAnimation() {
    // Delay the appearance of the red dot to match your animation timing
    setTimeout(() => {
        revealRedDot();
    }, 2000); // Adjust timing based on your animation
}

// Start the red dot animation after a delay
startRedDotAfterAnimation();
