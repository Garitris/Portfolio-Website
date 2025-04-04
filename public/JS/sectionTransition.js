// sectionTransition.js

export const handleSectionTransition = () => {
    const thirdSection = document.querySelector(".third_section_content");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                thirdSection.classList.add("visible");
                thirdSection.classList.remove("hidden");
            }
        });
    }, {
        threshold: 0.2  // Trigger when 10% of Section 3 is visible
    });

    observer.observe(thirdSection);
};
