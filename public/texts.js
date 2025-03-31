document.addEventListener("DOMContentLoaded", function () {
    // Text to be typed dynamically
    const dynamicText = "WHERE ΔBSENCE SPEAKS"; // Your dynamic text

    // Get the element where the text will be typed
    const dynamicTextElement = document.getElementById("dynamic-text");

    let index = 0;

    function typeText() {
        if (index < dynamicText.length) {
            dynamicTextElement.textContent += dynamicText.charAt(index);
            index++;
            setTimeout(typeText, 100);  // Adjust typing speed (100ms)
        }
    }

    // Start the blackhole animation
    const introSection = document.getElementById("intro");

    // Make the intro section visible after the blackhole animation finishes
    const videoElement = document.getElementById("blackhole_video");

    // Event listener for when the video ends (this assumes the video is fully played out)
    videoElement.addEventListener("ended", function () {

        // Fade in the intro section immediately after the video ends
        introSection.classList.add("visible");

        // Start the typing effect after the intro section has fully faded in
        setTimeout(function () {
            typeText();
        }, 800);  // Delay typing to let the intro section fade in first
    });
});
