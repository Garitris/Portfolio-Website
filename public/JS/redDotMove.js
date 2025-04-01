// Define red dot movement variables
let redDot;
let currentX, currentY, targetX, targetY;

// Define the speed of movement (higher values make the dot move faster)
const speed = 0.006;

// Function to update the red dot's position smoothly
export function updateRedDotPosition() {
    if (!redDot) return; // Ensure red dot exists before modifying styles

    const dx = targetX - currentX;
    const dy = targetY - currentY;

    currentX += dx * speed;
    currentY += dy * speed;

    redDot.style.left = `${currentX}px`;
    redDot.style.top = `${currentY}px`;

    requestAnimationFrame(updateRedDotPosition);
}

// Listen for mouse movement to update target position
export function trackMouse() {
    document.addEventListener("mousemove", (e) => {
        targetX = e.pageX;
        targetY = e.pageY;
    });
}

// Function to initialize the red dot movement AFTER reveal animation
export function initializeRedDot() {
    redDot = document.querySelector(".red-dot");

    if (!redDot) {
        console.error("Red dot element not found!");
        return;
    }

    // Set initial position (Top Center)
    currentX = window.innerWidth / 2;
    currentY = window.innerHeight = -50; // 10% from the top
    targetX = currentX;
    targetY = currentY;

    updateRedDotPosition(); // Start movement loop
    trackMouse();           // Start tracking the mouse
}
