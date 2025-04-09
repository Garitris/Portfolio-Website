// Define red dot movement variables
let redDot;
let currentX, currentY, targetX, targetY;

// Jitter effect parameters
const jitterDistance = 60;  // Distance to start jittering
const jitterIntensity = 3.5;   // How much the dot jitters (adjust as needed)

// Function to update the red dot's position smoothly
export function updateRedDotPosition() {
    if (!redDot) return; // Safety check

    const dx = targetX - currentX;
    const dy = targetY - currentY;

    // Calculate the distance between current and target positions
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Define a base speed factor
    const baseSpeed = 0.0025;

    // Adjust the speed based on distance — slows as it nears target
    const easing = Math.min(baseSpeed * distance, 20); // Cap max movement step

    // Normalize direction vector
    const angle = Math.atan2(dy, dx);
    const stepX = Math.cos(angle) * easing;
    const stepY = Math.sin(angle) * easing;

    // If within jitter distance, apply jitter effect
    if (distance < jitterDistance) {
        // Randomly apply a small offset to the red dot's movement
        currentX += stepX + (Math.random() - 0.5) * jitterIntensity;
        currentY += stepY + (Math.random() - 0.5) * jitterIntensity;
    } else {
        // Normal movement if not near cursor
        currentX += stepX;
        currentY += stepY;
    }

    // Apply the updated position
    redDot.style.left = `${currentX}px`;
    redDot.style.top = `${currentY}px`;

    // Keep updating each frame
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
    // Log whether this is a revisit or initial animation load
    if (sessionStorage.getItem('animationComplete') === 'true') {
        console.log("Red dot initialized immediately after animation completion.");
    } else {
        console.log("Animation is not complete yet. Red dot will initialize after animation.");
    }

    // Get the red dot element from the DOM
    redDot = document.querySelector(".red-dot");

    // Safety check — log an error if it doesn't exist
    if (!redDot) {
        console.error("Red dot element not found!");
        return;
    }

    // Measure the red dot's current position on the screen
    const redDotRect = redDot.getBoundingClientRect();

    // Set currentX and currentY to the red dot's initial position on screen
    currentX = redDotRect.left;
    currentY = redDotRect.top;

    // CRUCIAL FIX:
    // Set targetX and targetY to the same values at the start
    // This avoids the red dot "jumping" fast toward the cursor on revisit,
    // which happens when the cursor is far away from where the red dot spawns
    targetX = currentX;
    targetY = currentY;

    // Start the loop that moves the red dot smoothly toward the target
    updateRedDotPosition();

    // Begin listening for mouse movement, which updates the targetX and targetY values
    trackMouse();
}
