// Function for typing dynamic text
export function typeText(elementId, dynamicText, typingSpeed = 100) {
    const dynamicTextElement = document.getElementById(elementId);

    // Ensure the element exists
    if (!dynamicTextElement) {
        console.error("Dynamic text element not found:", elementId);
        return;
    }

     // Disable interactions (e.g., no text selection or clicks)
     dynamicTextElement.style.pointerEvents = "none";
     dynamicTextElement.style.userSelect = "none"; // Disable text selection

    let index = 0;

    function type() {
        if (index < dynamicText.length) {
            dynamicTextElement.textContent += dynamicText.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        }
    }

    type();
}

// Function to handle the video end and reveal the intro section
export function handleVideoEnd(videoElementId, introElementId, typingSpeed = 100) {
    const introSection = document.getElementById(introElementId); // Should be 'main_gallery'
    const videoElement = document.getElementById(videoElementId); // Should be 'blackhole_video'

    // Ensure the video and intro section exist
    if (!videoElement) {
        console.error("Video element not found:", videoElementId);
        return;
    }
    if (!introSection) {
        console.error("Intro section not found:", introElementId);
        return;
    }

    // Determine the dynamic text to type based on the section or state
    const dynamicText = getDynamicText();  // Call to get the correct dynamic text

    // Event listener for when the video ends
    videoElement.addEventListener("ended", function () {
        // Fade in the intro section after the video ends
        introSection.classList.add("visible");

        // Start typing the text after a short delay to allow intro section to fade in
        setTimeout(function () {
            // Call the typing effect
            typeText("dynamic-text", dynamicText, typingSpeed); // Make sure "dynamic-text" matches the ID
        }, 800);  // Adjust delay to allow for fade-in effect
    });
}

// Function to determine the dynamic text to be typed (editable here)
function getDynamicText() {
    // You can change this text based on certain conditions, for example:
    return "WHERE ΔBSENCE SPEAKS";
    // Or use other dynamic logic, like loading from a file, etc.
    
}

