// ========== TYPE TEXT UTILITY ==========
// Handles typing animation for dynamic messages
export function typeText(elementId, dynamicText, typingSpeed = 100) {
    const dynamicTextElement = document.getElementById(elementId);

    // Ensure the target element exists
    if (!dynamicTextElement) {
        console.error("Dynamic text element not found:", elementId);
        return;
    }

    // Disable interactions (e.g., no text selection or clicks)
    dynamicTextElement.style.pointerEvents = "none";
    dynamicTextElement.style.userSelect = "none";

    let index = 0;

    function type() {
        if (index < dynamicText.length) {
            dynamicTextElement.textContent += dynamicText.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        }
    }

    type(); // Start typing
}

// ========== HANDLE VIDEO END ==========
export function handleVideoEnd(videoElementId, introElementId, typingSpeed = 100) {
    const videoElement = document.getElementById(videoElementId);     // e.g. "blackhole_video"
    const introSection = document.getElementById(introElementId);     // e.g. "main_gallery"

    // Confirm video and intro section exist
    if (!videoElement) {
        console.error("Video element not found:", videoElementId);
        return;
    }
    if (!introSection) {
        console.error("Intro section not found:", introElementId);
        return;
    }

    const dynamicText = getDynamicText(); // Get the string to type

    // When video ends, reveal intro + trigger typewriter effect
    videoElement.addEventListener("ended", () => {
        introSection.classList.add("visible"); // Fade in main section

        setTimeout(() => {
            typeText("dynamic-text", dynamicText, typingSpeed); // Match the target ID
        }, 800); // Wait a bit for fade-in animation
    });
}

// ========== SET DYNAMIC MESSAGE ==========
function getDynamicText() {
    // Replace or expand with logic for dynamic messaging if needed
    return "WHERE ΔBSENCE SPEAKS";
}
