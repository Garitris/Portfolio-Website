export function initializeRedDotMovement(redDot) {
    let currentX = window.innerWidth / 2; 
    let currentY = 0;
    let targetX = currentX;
    let targetY = currentY;

    const speed = 0.006; 

    function updateRedDotPosition() {
        const dx = targetX - currentX;
        const dy = targetY - currentY;

        currentX += dx * speed;
        currentY += dy * speed;

        redDot.style.left = `${currentX}px`;
        redDot.style.top = `${currentY}px`;

        requestAnimationFrame(updateRedDotPosition);
    }

    document.addEventListener('mousemove', (e) => {
        targetX = e.pageX;
        targetY = e.pageY;
    });

    updateRedDotPosition(); 
}
