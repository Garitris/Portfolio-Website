// ========== CONSTANTS ==========
// These never change. They're parameters for how the dot behaves.
const jitterDistance = 30;      // When dot gets this close to cursor, start jittering
const jitterIntensity = 3.5;    // How intense the jitter effect is
const baseSpeed = 0.0004;       // Base movement speed of the red dot (screen-size normalized)
const snapThreshold = 40;       // Distance at which red dot snaps to red ring

// ========== VARIABLES ==========
// These change over time as the dot moves around
let redDot;                     // The actual red dot element from the DOM
let redRing, info1;             // Elements for snapping and revealing info
let currentX, currentY;         // Current position of the red dot
let targetX, targetY;           // Target position (follows the mouse)
let lastTimestamp = null;       // Timestamp of the previous animation frame
let hasSnapped = false;         // Whether the dot is currently snapped to the ring

// ========== INITIALIZATION ==========
// Called once after the animation finishes to start everything
export function initializeRedDot() {
    if (sessionStorage.getItem('animationComplete') === 'true') {
        console.log("Red dot initialized immediately after animation completion.");
    } else {
        console.log("Animation is not complete yet. Red dot will initialize after animation.");
    }

    redDot = document.querySelector(".red-dot");
    redRing = document.getElementById("red-ring");
    info1 = document.querySelector(".info1");

    if (!redDot || !redRing || !info1) {
        console.error("Missing essential elements for red dot behavior.");
        return;
    }

    const redDotRect = redDot.getBoundingClientRect();
    currentX = redDotRect.left;
    currentY = redDotRect.top;

    targetX = currentX;
    targetY = currentY;

    requestAnimationFrame(updateRedDotPosition);
    trackMouse();
}

// ========== EVENT LISTENER ==========
// Watches the mouse and updates the targetX / targetY values
export function trackMouse() {
    document.addEventListener("mousemove", (e) => {
        targetX = e.pageX;
        targetY = e.pageY;
    });
}

// ========== SNAP CHECK FUNCTION ==========
// Determines if the red dot should snap to the red ring
function checkSnapToRing() {
    if (!redRing || !info1) return;

    const ringRect = redRing.getBoundingClientRect();
    const ringX = ringRect.left + ringRect.width / 2 + window.scrollX;
    const ringY = ringRect.top + ringRect.height / 2 + window.scrollY;

    const dx = ringX - currentX;
    const dy = ringY - currentY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < snapThreshold && !hasSnapped) {
        hasSnapped = true;

        // Snap to center of red ring
        currentX = ringX;
        currentY = ringY;
        redDot.style.left = `${currentX}px`;
        redDot.style.top = `${currentY}px`;

        // Reveal .info1
        info1.classList.add("visible");
    }

    if (distance > snapThreshold + 80 && hasSnapped) {
        hasSnapped = false;
        info1.classList.remove("visible");
    }
}


// ========== CORE LOOP ==========
// Called every frame to update the red dot’s position
export function updateRedDotPosition(timestamp) {
    if (!redDot) return; // Safety check

    // Time delta in seconds between frames
    if (lastTimestamp === null) lastTimestamp = timestamp;
    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    const dx = targetX - currentX;
    const dy = targetY - currentY;

    // Calculate distance to target (Pythagorean theorem)
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Easing factor: increase speed when far, slow down when near
    const easingFactor = Math.min(distance * 0.01, 2); // Between 0–2

    // Scaled speed based on screen width and frame delta
    const speed = baseSpeed * window.innerWidth * easingFactor;

    // Movement per frame
    const stepX = dx * speed * deltaTime;
    const stepY = dy * speed * deltaTime;

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

    checkSnapToRing(); 

    // Loop again next frame
    requestAnimationFrame(updateRedDotPosition);
}


