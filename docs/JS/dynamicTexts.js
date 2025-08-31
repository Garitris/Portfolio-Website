// ========== TYPE TEXT UTILITY ==========
export function typeText(elementId, dynamicText, typingSpeed = 100) {
    const dynamicTextElement = document.getElementById(elementId);
    if (!dynamicTextElement) return;

    // Reset content so it types every time
    dynamicTextElement.textContent = "";

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

// ========== INITIALIZE TYPING ==========
export function initDynamicText(elementId = "dynamic-text", typingSpeed = 100) {
    const dynamicText = "WHERE ΔBSENCE SPEAKS";

    // Make sure container is visible
    const container = document.getElementById(elementId)?.parentElement;
    if (container) container.style.display = "inline-block";

    // Start typing immediately on page load
    window.addEventListener("load", () => {
        typeText(elementId, dynamicText, typingSpeed);
    });
}
