// ========== CONSTANTS ==========
// Defines behavior parameters for the red dot animation and interaction
const jitterDistance = 30;       // Distance from cursor where jitter effect starts
const jitterIntensity = 3.5;     // Magnitude of random jitter when close to cursor
const baseSpeed = 0.0004;        // Base speed for red dot movement (normalized to screen size)
const snapThreshold = 40;        // Distance at which red dot snaps to center of red ring
const ringAttractionSpeed = 6;   // Speed at which red dot is pulled towards the red ring (constant)

// ========== VARIABLES ==========
// Elements and state variables for tracking red dot and interaction logic
let redDot, redRing, info1;           // DOM elements: red dot, red ring, and info tooltip
let currentX, currentY;               // Current position of the red dot in pixels
let targetX, targetY;                 // Target position the red dot moves toward (cursor position)
let lastTimestamp = null;            // Timestamp of last animation frame for deltaTime calculation
let hasSnapped = false;              // Flag indicating if red dot is snapped to the ring
let unsnapTimer = null;              // Timeout ID for delaying unsnap action
let isBeingPulledToRing = false;     // Flag indicating if red dot is currently being pulled to ring
let cursorFollow = true;             // Flag controlling whether red dot follows cursor

// ========== INITIALIZATION ==========
// Sets up the red dot and ring elements, initializes positions, and starts animation
export function initializeRedDot() {
    redDot = document.querySelector(".red-dot");
    redRing = document.getElementById("red-ring");
    info1 = document.querySelector(".info1");

    if (!redDot) {
        console.error("Red dot element missing.");
        return;
    }

    // Initialize current and target positions based on red dot's starting location
    const redDotRect = redDot.getBoundingClientRect();
    currentX = redDotRect.left;
    currentY = redDotRect.top;
    targetX = currentX;
    targetY = currentY;

    // Start the animation loop
    requestAnimationFrame(updateRedDotPosition);

    // Start tracking mouse movement for target updates
    trackMouse();
}

// ========== MOUSE TRACKING ==========
// Listens for mousemove events and updates target position unless dot is snapped or being pulled
export function trackMouse() {
    document.addEventListener("mousemove", (e) => {
        // Only update target if cursor follow is enabled, and dot is free (not snapped or pulled)
        if (cursorFollow && !hasSnapped && !isBeingPulledToRing) {
            targetX = e.pageX;
            targetY = e.pageY;

            // If cursor is over the ring, start pulling dot toward the ring and stop cursor following
            if (redRing && checkCursorOnRing(e.pageX, e.pageY)) {
                isBeingPulledToRing = true;
                cursorFollow = false;
            }
        }
    });
}

// ========== HELPER: IS CURSOR ON RING ==========
// Returns true if the cursor is currently over the red ring element area
function checkCursorOnRing(cursorX, cursorY) {
    if (!redRing) return false;

    const ringRect = redRing.getBoundingClientRect();
    // Calculate absolute ring boundaries including page scroll offsets
    const ringLeft = ringRect.left + window.scrollX;
    const ringRight = ringRect.right + window.scrollX;
    const ringTop = ringRect.top + window.scrollY;
    const ringBottom = ringRect.bottom + window.scrollY;

    // Check if cursor lies within these boundaries
    return (
        cursorX >= ringLeft &&
        cursorX <= ringRight &&
        cursorY >= ringTop &&
        cursorY <= ringBottom
    );
}

// ========== HELPER: SNAP TO RING ==========
// Checks if red dot should snap to ring center based on proximity; handles snapping and unsnapping
function checkSnapToRing() {
    if (!redRing || isBeingPulledToRing) return;

    const ringRect = redRing.getBoundingClientRect();
    // Calculate ring center coordinates including scroll offset
    const ringX = ringRect.left + ringRect.width / 2 + window.scrollX;
    const ringY = ringRect.top + ringRect.height / 2 + window.scrollY;

    // Calculate distance from current dot position to ring center
    const dx = ringX - currentX;
    const dy = ringY - currentY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Snap dot to ring center if within snapThreshold and not already snapped
    if (distance < snapThreshold && !hasSnapped) {
        hasSnapped = true;
        currentX = ringX;
        currentY = ringY;
        redDot.style.left = `${currentX}px`;
        redDot.style.top = `${currentY}px`;
        if (info1) info1.classList.add("visible");  // Show additional info UI
    }

    // If dot moves away beyond threshold + buffer and is snapped, unsnap it and hide info
    if (distance > snapThreshold + 80 && hasSnapped) {
        hasSnapped = false;
        if (info1) info1.classList.remove("visible");
    }
}

// ========== ANIMATION LOOP ==========
// Main animation loop updating the red dot position every frame based on current state
function updateRedDotPosition(timestamp) {
    if (!redDot) return;

    if (lastTimestamp === null) lastTimestamp = timestamp;
    const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert ms to seconds
    lastTimestamp = timestamp;

    if (isBeingPulledToRing) {
        // Calculate vector from dot to ring center for pull movement
        const ringRect = redRing.getBoundingClientRect();
        const ringX = ringRect.left + ringRect.width / 2 + window.scrollX;
        const ringY = ringRect.top + ringRect.height / 2 + window.scrollY;

        const pullDx = ringX - currentX;
        const pullDy = ringY - currentY;
        const pullDistance = Math.sqrt(pullDx * pullDx + pullDy * pullDy);

        // Move dot towards ring at constant ringAttractionSpeed
        const pullSpeed = ringAttractionSpeed;
        currentX += pullDx * pullSpeed * deltaTime;
        currentY += pullDy * pullSpeed * deltaTime;

        // Once close enough, snap dot to ring and start unsnap timeout
        if (pullDistance < 2) {
            currentX = ringX;
            currentY = ringY;
            isBeingPulledToRing = false;
            hasSnapped = true;

            redDot.style.left = `${currentX}px`;
            redDot.style.top = `${currentY}px`;

            if (info1) info1.classList.add("visible");

            clearTimeout(unsnapTimer);
            unsnapTimer = setTimeout(() => {
                hasSnapped = false;
                cursorFollow = true;
                if (info1) info1.classList.remove("visible");
            }, 1500);

            requestAnimationFrame(updateRedDotPosition);
            return;  // Exit early to avoid duplicate frame request below
        }

    } else if (!hasSnapped) {
        // Normal cursor-following movement with easing and jitter when close
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Easing factor scales speed depending on distance to target (max 2)
        const easingFactor = Math.min(distance * 0.1, 2);
        // Speed scales with screen width and easing
        const speed = baseSpeed * window.innerWidth * easingFactor;

        const stepX = dx * speed * deltaTime;
        const stepY = dy * speed * deltaTime;

        // Add jitter randomization when near cursor and not being pulled
        if (distance < jitterDistance && !isBeingPulledToRing) {
            currentX += stepX + (Math.random() - 0.5) * jitterIntensity;
            currentY += stepY + (Math.random() - 0.5) * jitterIntensity;
        } else {
            currentX += stepX;
            currentY += stepY;
        }

    } else {
        // When snapped, lock dot position exactly to ring center
        const ringRect = redRing.getBoundingClientRect();
        const ringX = ringRect.left + ringRect.width / 2 + window.scrollX;
        const ringY = ringRect.top + ringRect.height / 2 + window.scrollY;
        currentX = ringX;
        currentY = ringY;

        // Check if cursor moved far from ring, then unsnap and resume cursor following
        const cursorDist = Math.hypot(targetX - ringX, targetY - ringY);
        if (cursorDist > snapThreshold + 80) {
            hasSnapped = false;
            cursorFollow = true;
            if (info1) info1.classList.remove("visible");
            clearTimeout(unsnapTimer);
        }
    }

    // Apply computed position to the red dot element
    redDot.style.left = `${currentX}px`;
    redDot.style.top = `${currentY}px`;

    // Request next animation frame to continue the loop
    requestAnimationFrame(updateRedDotPosition);
}
