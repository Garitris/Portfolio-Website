import { gsap } from "https://cdn.skypack.dev/gsap";

export const initializeScrollIndicator = () => {
    const dotTop = document.getElementById("dotTop");
    const dotBottom = document.getElementById("dotBottom");

    if (!dotTop || !dotBottom) {
        console.warn("Scroll indicator dots not found");
        return;
    }

    // Set initial positions and sizes
    const initialTop = { x: 0, y: 50 };
    const initialBottom = { x: 0, y: 50 };
    const initialSize = { width: 12, height: 12 }; // Starting size in pixels
    const shrinkSize = 0.5;    // Scale factor for shrinking
    const growSize = 2;       // Scale factor for growing

    // Double size for top dot initially
    const initialTopSize = 2; // Scale factor (initial size of 2x)

    gsap.set(dotTop, { ...initialTop, scale: initialTopSize });
    gsap.set(dotBottom, { ...initialBottom, scale: 1 }); // No scaling initially for bottom dot

    const moveAmountTop = 16;
    const moveAmountBottom = 16;

    // Scroll Down Animation
    const activateScrollDown = () => {
        const tl = gsap.timeline();

        // Phase 1: dots shrink and move
        tl.to(dotTop, {
            y: initialTop.y + moveAmountTop,
            scale: shrinkSize, // Shrink to 50% of original size
            duration: 1.55,
            ease: "power3.inOut",
        }, 0);

        tl.to(dotBottom, {
            y: initialBottom.y - moveAmountBottom,
            duration: 1.55,
            ease: "power3.inOut",
        }, 0);

        // Phase 2: restore original size and move further
        tl.to(dotTop, {
            y: initialTop.y + moveAmountTop + 16,
            scale: growSize,
            duration: 1,
            ease: "power3.inOut",
        }, ">");

        tl.to(dotBottom, {
            y: initialBottom.y - moveAmountBottom - 16,
            duration: 1,
            ease: "power3.inOut",
        }, "<");
    };

    // Scroll Up Animation
    const activateScrollUp = () => {
        const tl = gsap.timeline();

        // Phase 1: top dot grows, bottom dot shrinks and both move
        tl.to(dotTop, {
            y: initialTop.y + moveAmountTop,
            scale: shrinkSize, // Grow to 2x size
            duration: 1,
            ease: "power3.inOut",
        }, 0);

        tl.to(dotBottom, {
            y: initialBottom.y - moveAmountBottom,
            duration: 1,
            ease: "power3.inOut",
        }, 0);

        // Phase 2: return to original position and size
        tl.to(dotTop, {
            ...initialTop,
            scale: growSize, // Return to original size (100%)
            duration: 1.55,
            ease: "power3.inOut",
        }, ">");

        tl.to(dotBottom, {
            ...initialBottom,
            duration: 1.55,
            ease: "power3.inOut",
        }, "<");
    };

    // Scroll Locking
    let isAnimating = false;
    let lastScrollY = window.scrollY;

    const lockScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    const unlockScroll = () => {
        document.body.style.overflow = '';
    };

    const handleScroll = (event) => {
        const currentScrollY = window.scrollY;
        const deltaY = event.deltaY || (event.touches?.[0]?.clientY || 0);
        const isScrollingDown = currentScrollY > lastScrollY || deltaY > 0;

        if (isAnimating) {
            event.preventDefault();
            return;
        }

        isAnimating = true;
        lockScroll();

        if (isScrollingDown) {
            activateScrollDown();
        } else {
            activateScrollUp();
        }

        setTimeout(() => {
            isAnimating = false;
            unlockScroll();
        }, 2550);

        event.preventDefault();
        lastScrollY = currentScrollY;
    };

    document.addEventListener("wheel", handleScroll, { passive: false });
    document.addEventListener("touchstart", handleScroll, { passive: false });

    dotTop.classList.add("active");
    dotBottom.classList.remove("active");
};
