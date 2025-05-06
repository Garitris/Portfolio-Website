// ========== CONSTANTS ==========
const jitterDistance = 30;       // Jitter triggers when within this range to cursor
const jitterIntensity = 3.5;     // Intensity of jitter
const baseSpeed = 0.0004;        // Base movement speed of the red dot (screen-size normalized)
const snapThreshold = 40;        // Distance at which the dot snaps to the red ring
const ringAttractionSpeed = 6;   // Speed at which the red dot moves towards the red ring (constant speed)

// ========== VARIABLES ==========
let redDot, redRing, info1;           // Red dot, red ring, and info1 elements
let currentX, currentY;               // Current position of the red dot
let targetX, targetY;                 // Target position (follows mouse)
let lastTimestamp = null;            // Last timestamp for animation
let hasSnapped = false;              // Whether the dot has snapped to the ring
let unsnapTimer = null; // Optional timeout unsnap
let isBeingPulledToRing = false;     // Flag for persistent ring pull behavior
let cursorFollow = true;             // Flag controlling cursor-following behavior

// ========== INITIALIZATION ==========
export function initializeRedDot() {
    redDot = document.querySelector(".red-dot");
    redRing = document.getElementById("red-ring");
    info1 = document.querySelector(".info1");

    if (!redDot) {
        console.error("Red dot element missing.");
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

// ========== MOUSE TRACKING ==========
export function trackMouse() {
    document.addEventListener("mousemove", (e) => {
        if (cursorFollow && !hasSnapped && !isBeingPulledToRing) {
            targetX = e.pageX;
            targetY = e.pageY;

            if (redRing && checkCursorOnRing(e.pageX, e.pageY)) {
                isBeingPulledToRing = true;
                cursorFollow = false;
            }
        }
    });
}

// ========== HELPER: IS CURSOR ON RING ==========
function checkCursorOnRing(cursorX, cursorY) {
    if (!redRing) return false;

    const ringRect = redRing.getBoundingClientRect();
    const ringLeft = ringRect.left + window.scrollX;
    const ringRight = ringRect.right + window.scrollX;
    const ringTop = ringRect.top + window.scrollY;
    const ringBottom = ringRect.bottom + window.scrollY;

    return (
        cursorX >= ringLeft &&
        cursorX <= ringRight &&
        cursorY >= ringTop &&
        cursorY <= ringBottom
    );
}

// ========== HELPER: SNAP TO RING ==========
function checkSnapToRing() {
    if (!redRing || isBeingPulledToRing) return;

    const ringRect = redRing.getBoundingClientRect();
    const ringX = ringRect.left + ringRect.width / 2 + window.scrollX;
    const ringY = ringRect.top + ringRect.height / 2 + window.scrollY;

    const dx = ringX - currentX;
    const dy = ringY - currentY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < snapThreshold && !hasSnapped) {
        hasSnapped = true;
        currentX = ringX;
        currentY = ringY;
        redDot.style.left = `${currentX}px`;
        redDot.style.top = `${currentY}px`;
        if (info1) info1.classList.add("visible");
    }

    if (distance > snapThreshold + 80 && hasSnapped) {
        hasSnapped = false;
        if (info1) info1.classList.remove("visible");
    }
}

// ========== ANIMATION LOOP ==========
function updateRedDotPosition(timestamp) {
    if (!redDot) return;

    if (lastTimestamp === null) lastTimestamp = timestamp;
    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    if (isBeingPulledToRing) {
        const ringRect = redRing.getBoundingClientRect();
        const ringX = ringRect.left + ringRect.width / 2 + window.scrollX;
        const ringY = ringRect.top + ringRect.height / 2 + window.scrollY;

        const pullDx = ringX - currentX;
        const pullDy = ringY - currentY;
        const pullDistance = Math.sqrt(pullDx * pullDx + pullDy * pullDy);

        const pullSpeed = ringAttractionSpeed;

        currentX += pullDx * pullSpeed * deltaTime;
        currentY += pullDy * pullSpeed * deltaTime;

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
            return;
        }

    } else if (!hasSnapped) {
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const easingFactor = Math.min(distance * 0.1, 2);
        const speed = baseSpeed * window.innerWidth * easingFactor;

        const stepX = dx * speed * deltaTime;
        const stepY = dy * speed * deltaTime;

        if (distance < jitterDistance && !isBeingPulledToRing) {
            currentX += stepX + (Math.random() - 0.5) * jitterIntensity;
            currentY += stepY + (Math.random() - 0.5) * jitterIntensity;
        } else {
            currentX += stepX;
            currentY += stepY;
        }

    } else {
        // If snapped, hold the dot perfectly centered on the ring
        const ringRect = redRing.getBoundingClientRect();
        const ringX = ringRect.left + ringRect.width / 2 + window.scrollX;
        const ringY = ringRect.top + ringRect.height / 2 + window.scrollY;
        currentX = ringX;
        currentY = ringY;

        // Also check if cursor left the ring zone (for unsnapping)
        const cursorDist = Math.hypot(targetX - ringX, targetY - ringY);
        if (cursorDist > snapThreshold + 80) {
            hasSnapped = false;
            cursorFollow = true;
            if (info1) info1.classList.remove("visible");
            clearTimeout(unsnapTimer);
        }
    }

    redDot.style.left = `${currentX}px`;
    redDot.style.top = `${currentY}px`;

    requestAnimationFrame(updateRedDotPosition);
}
