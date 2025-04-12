// ========== CONSTANTS ==========
// These never change. They're parameters for how the dot behaves.
const jitterDistance = 60;      // When dot gets this close to cursor, start jittering
const jitterIntensity = 3.5;    // How intense the jitter effect is
const baseSpeed = 0.0025;       // Base movement speed of the red dot

// ========== VARIABLES ==========
// These change over time as the dot moves around
let redDot;                     // The actual red dot element from the DOM
let currentX, currentY;         // Current position of the red dot
let targetX, targetY;           // Target position (follows the mouse)

// ========== EVENT LISTENER ==========
// Watches the mouse and updates the targetX / targetY values
export function trackMouse() {
    document.addEventListener("mousemove", (e) => {
        targetX = e.pageX;
        targetY = e.pageY;
    });
}

// ========== CORE LOOP ==========
// Called every frame to update the red dot’s position
export function updateRedDotPosition() {
    if (!redDot) return; // Safety check

    const dx = targetX - currentX;
    const dy = targetY - currentY;

    // Calculate distance to target (Pythagorean theorem)
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Easing based on distance (dot slows down as it nears target)
    const easing = Math.min(baseSpeed * distance, 20);

    // Find direction of movement (angle toward the target)
    const angle = Math.atan2(dy, dx);
    const stepX = Math.cos(angle) * easing;
    const stepY = Math.sin(angle) * easing;

    // If dot is close to the target, apply jitter for dynamic effect
    if (distance < jitterDistance) {
        currentX += stepX + (Math.random() - 0.5) * jitterIntensity;
        currentY += stepY + (Math.random() - 0.5) * jitterIntensity;
    } else {
        // Otherwise, move normally toward the target
        currentX += stepX;
        currentY += stepY;
    }

    // Apply updated position to the red dot
    redDot.style.left = `${currentX}px`;
    redDot.style.top = `${currentY}px`;

    // Loop again next frame
    requestAnimationFrame(updateRedDotPosition);
}

// ========== INITIALIZATION ==========
// Called once after the animation finishes to start everything
export function initializeRedDot() {
    // Log to console depending on session state
    if (sessionStorage.getItem('animationComplete') === 'true') {
        console.log("Red dot initialized immediately after animation completion.");
    } else {
        console.log("Animation is not complete yet. Red dot will initialize after animation.");
    }

    // Grab red dot from the DOM
    redDot = document.querySelector(".red-dot");

    if (!redDot) {
        console.error("Red dot element not found!");
        return;
    }

    // Get initial position of red dot on screen
    const redDotRect = redDot.getBoundingClientRect();
    currentX = redDotRect.left;
    currentY = redDotRect.top;

    // Prevent jump by starting target where the dot is
    targetX = currentX;
    targetY = currentY;

    // Start movement loop + mouse tracking
    updateRedDotPosition();
    trackMouse();
}
